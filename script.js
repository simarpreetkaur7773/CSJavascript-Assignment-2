document.addEventListener("DOMContentLoaded", function () {
  const studentInfo = document.getElementById("studentInfo");
  studentInfo.textContent = "Student ID: 200520470, Name: Simarpreet Kaur";

  // Event listener for the blend button
  document
    .getElementById("blendIt")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission
      console.log("Blend It button clicked"); // Debugging log

      if (!validateForm()) {
        console.log("Validation failed"); // Debugging log
        return;
      }

      const smoothieOrder = new Smoothie();
      smoothieOrder.captureFormData();
      smoothieOrder.displayOrderSummary();
    });
});

// Function to validate the form
function validateForm() {
  let errors = [];

  const base = document.getElementById("base").value;
  if (!base) {
    errors.push("Please select a base for your smoothie.");
  }

  const fruitElements = document.querySelectorAll(
    'input[name="fruits"]:checked'
  );
  if (fruitElements.length === 0) {
    errors.push("Please select at least one fruit.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}

// Smoothie class
class Smoothie {
  constructor() {
    this.base = "";
    this.fruits = [];
    this.addIns = [];
    this.specialInstructions = "";
  }

  captureFormData() {
    this.base = document.getElementById("base").value;
    const fruitElements = document.querySelectorAll(
      'input[name="fruits"]:checked'
    );
    this.fruits = Array.from(fruitElements).map((element) => element.value);
    const addInElements = document.querySelectorAll(
      'input[name="addins"]:checked'
    );
    this.addIns = Array.from(addInElements).map((element) => element.value);
    this.specialInstructions = document.getElementById("instructions").value;
  }

  displayOrderSummary() {
    let orderSummary = `
      <h2>Smoothie Order</h2>
      <p>Base: ${this.base}</p>
      <p>Fruits: ${this.fruits.join(", ")}</p>`;

    if (this.addIns.length > 0) {
      orderSummary += `<p>Add-Ins: ${this.addIns.join(", ")}</p>`;
    }

    if (this.specialInstructions) {
      orderSummary += `<p>Special Instructions: ${this.specialInstructions}</p>`;
    }

    orderSummary += `</div>`;

    document.getElementById("smoothieOrder").innerHTML = orderSummary;
  }
}
