describe("Homepage", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	describe("Counter", () => {
		it("The counter component has functional decrement/increment functionality", () => {
			cy.get('input[title="Counter value"]').should("have.value", 0);
			cy.get("button").contains("Decrement").click();
			cy.get('input[title="Counter value"]').should("have.value", -1);
			cy.get("button").contains("Increment").click();
			cy.get("button").contains("Increment").click();
			cy.get('input[title="Counter value"]').should("have.value", 1);
		});

		it("The counter component should not update when key pressed", () => {
			cy.get('input[title="Counter value"]').trigger("keydown", {
				key: "a",
			});
			cy.get('input[title="Counter value"]').should("have.value", 0);
		});

		it("The counter component should have no outline when focused", () => {
			cy.get('input[title="Counter value"]').focus();
			cy.get('input[title="Counter value"]').should(
				"have.css",
				"outline",
				"rgb(0, 0, 0) none 0px"
			);
		});
	});
});
