import fs from "./promisified/fs";
import sortBy from "lodash/sortBy";
import Promise from "bluebird";
import { Glob } from "glob";
import FileOptionsProvider from "./FileOptionsProvider";

type FileOptionsTuple = [Object, Object];

const DEFAULT_GLOB_OPTIONS = {
	dot    : true,
	nodir  : true,
	nosort : true // Sorting is gonna be done anyway
};

/**
 * @this FileProvider
 * @private
 */
function createTuple(base: string, relative: string): FileOptionsTuple {
	let options = this._fileOptionsProvider.getOptions(relative);
	if (!options) {
		return;
	}

	let file = {};

	if (options.priority) {
		file.priority = options.priority;
	}

	file.src = { base, relative };

	return [file, options];
}

/**
 * Sort tuples by priority first and then by src relative path.
 *
 * @this FileProvider
 * @private
 */
function sortTuples(tuples: Array<FileOptionsTuple>): Array<FileOptionsTuple> {
	return sortBy(tuples,
		tuple => (tuple[0].priority || 0) * -1,
		tuple => tuple[0].relative);
}

export default class FileProvider {

	_fileOptionsProvider: FileOptionsProvider;

	constructor(options: Object) {
		this._fileOptionsProvider = new FileOptionsProvider(options);
	}

	/**
	 * Get sorted file/options tuples from a given directory.
	 *
	 * @param baseDir Path of the directory from where to list source files.
	 * @returns Sorted array of file/options tuples.
	 */
	async getSorted(baseDir: string): Array<FileOptionsTuple> {
		let self = this;

		let absoluteBaseDir = await fs.realpathAsync(baseDir);
		let globOptions = Object.assign(DEFAULT_GLOB_OPTIONS, {
			cwd: absoluteBaseDir
		});

		let tuples = [];

		await Promise.fromCallback(callback => {
			new Glob("**", globOptions, callback).on("match", match => {
				let tuple = self::createTuple(absoluteBaseDir, match);
				if (tuple) {
					tuples.push(tuple);
				}
			});
		});

		return sortTuples(tuples);
	}
}