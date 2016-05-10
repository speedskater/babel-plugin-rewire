import Stats from "./src/Stats.js";
import expect from "expect.js";

describe("Test for issue 121", function() {
	describe("Stats with setting each dependency with separate __set__ call", function() {
		beforeEach(function() {
			Stats.__set__("getCount", function() {
				return 10;
			});

			Stats.__set__("getDuration", function() {
				return "100ms";
			});

			this.stats = new Stats();
		});

		afterEach(function() {
			Stats.__ResetDependency__("getCount");
			Stats.__ResetDependency__("getDuration");
		});

		it(".getCount() returns 10", function() {
			expect(this.stats.getCount()).to.be(10);
		});

		it(".getDuration() returns 100ms", function() {
			expect(this.stats.getDuration()).to.be("100ms");
		});
	});

	describe("Stats with setting all dependencies with one __set__ call", function() {
		beforeEach(function() {
			Stats.__set__({
				getCount: function() {
					return 15;
				},
				getDuration: function() {
					return "50ms";
				}
			});

			this.stats = new Stats();
		});

		afterEach(function() {
			Stats.__ResetDependency__("getCount");
			Stats.__ResetDependency__("getDuration");
		});

		it(".getCount() returns 15", function() {
			expect(this.stats.getCount()).to.be(15);
		});

		it(".getDuration() returns 50ms", function() {
			expect(this.stats.getDuration()).to.be("50ms");
		});
	});
});
