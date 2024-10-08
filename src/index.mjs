import "./styles.css";

const res = add("5,6");

document.getElementById("app").innerHTML = `
<h1>${res}</h1>
`;
function testStringCalculator() {
  // Test empty string
  console.assert(add("") === 0, 'Test Case 1 Failed: "" should return 0');

  // Test single number
  console.assert(add("1") === 1, 'Test Case 2 Failed: "1" should return 1');
  console.assert(add("5") === 5, 'Test Case 3 Failed: "5" should return 5');

  // Test two numbers
  console.assert(add("1,5") === 6, 'Test Case 4 Failed: "1,5" should return 6');
  console.assert(
    add("10,20") === 30,
    'Test Case 5 Failed: "10,20" should return 30'
  );

  // Test multiple numbers
  console.assert(
    add("1,2,3,4") === 10,
    'Test Case 6 Failed: "1,2,3,4" should return 10'
  );

  // Test newlines between numbers
  console.assert(
    add("1\n2,3") === 6,
    'Test Case 7 Failed: "1\\n2,3" should return 6'
  );

  // Test custom delimiter
  console.assert(
    add("//;\n1;2") === 3,
    'Test Case 8 Failed: "//;\\n1;2" should return 3'
  );
  console.assert(
    add("//|\n1|2|3") === 6,
    'Test Case 9 Failed: "//|\\n1|2|3" should return 6'
  );

  // Test exception for negative numbers
  try {
    add("1,-2,3");
  } catch (e) {
    console.assert(
      e === "negative numbers not allowed: -2",
      'Test Case 10 Failed: should throw exception "negative numbers not allowed: -2"'
    );
  }

  // Test multiple negative numbers
  try {
    add("1,-2,-3,4");
  } catch (e) {
    console.assert(
      e === "negative numbers not allowed: -2,-3",
      'Test Case 11 Failed: should throw exception "negative numbers not allowed: -2,-3"'
    );
  }

  console.log("All tests passed!");
}

function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = new RegExp(parts[0].slice(2)); // Extract custom delimiter
    numbers = parts[1];
  }

  const numberArray = numbers.split(delimiter).map(Number);

  // Check for negative numbers
  const negativeNumbers = numberArray.filter((n) => n < 0);
  if (negativeNumbers.length > 0) {
    throw `negative numbers not allowed: ${negativeNumbers.join(",")}`;
  }

  return numberArray.reduce((sum, num) => sum + num, 0);
}

testStringCalculator();
