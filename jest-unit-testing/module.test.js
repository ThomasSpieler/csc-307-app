import mut from "./module.js"; // MUT = Module Under Test

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// ----------------- div -----------------

test("div -- 1/1 = 1", () => {
  const expected = 1;
  const got = mut.div(1, 1);
  expect(got).toBe(expected);
});

test("div -- mundane: 8/2 = 4", () => {
  const expected = 4;
  const got = mut.div(8, 2);
  expect(got).toBe(expected);
});

test("div -- float output: 9/2 = 4.5", () => {
  const expected = 4.5;
  const got = mut.div(9, 2);
  expect(got).toBe(expected);
});

test("div -- float input: 3.7/3.2 = 4.5", () => {
  const expected = 1.15625;
  const got = mut.div(3.7, 3.2);
  expect(got).toBe(expected);
});

test("div -- 0/x = 0", () => {
  const expected = [0, 0, 0, -0, -0];
  const got = [
    mut.div(0, 1),
    mut.div(0, 45),
    mut.div(0, 255),
    mut.div(0, -1),
    mut.div(0, -255),
  ];
  expect(got).toStrictEqual(expected);
});

/* [Any number]/0 should throw an error no matter the circumstance. 
    Javascript processes it as Infinity for some reason, 
    and I'm ruling that as improper behavior. */
test("div -- 0/0 throws error", () => {
  expect(() => mut.div(0, 0)).toThrow(Error);
});

test("div -- 255/0 throws error", () => {
  expect(() => mut.div(255, 0)).toThrow(Error);
});

test("div -- -255/0 throws error", () => {
  expect(() => mut.div(-255, 0)).toThrow(Error);
});

// I'm a schrooge and want div to throw errors if the output is not a number.
test("div -- input not numbers throws error", () => {
  expect(() => mut.div("charlie", "tim")).toThrow(Error);
});

// ----------------- containsNumbers -----------------
test("containsNumbers -- empty string returns false", () => {
  const input = "";
  expect(mut.containsNumbers(input)).toBeFalsy();
});

test("containsNumbers -- full string returns false", () => {
  const input = "charlieandtimeatingapples";
  expect(mut.containsNumbers(input)).toBeFalsy();
});

test("containsNumbers -- full sentence returns false", () => {
  const input = "charlie and tim eating apples!";
  expect(mut.containsNumbers(input)).toBeFalsy();
});

test("containsNumbers -- symbols returns false", () => {
  const input = "!@#$%^&*()-_=+[{]}\\|;:\"'?/>.<,~`";
  expect(mut.containsNumbers(input)).toBeFalsy();
});

test("containsNumbers -- single number, middle of sentence, returns true", () => {
  const input = "charlie and tim eating app1es!";
  expect(mut.containsNumbers(input)).toBeTruthy();
});

test("containsNumbers -- single number, end of sentence, returns true", () => {
  const input = "charlie and tim eating apples!4";
  expect(mut.containsNumbers(input)).toBeTruthy();
});

test("containsNumbers -- single number, start of sentence, returns true", () => {
  const input = "charlie and tim eating apples!4";
  expect(mut.containsNumbers(input)).toBeTruthy();
});

test("containsNumbers -- single number 0-9 returns true", () => {
  expect(mut.containsNumbers("1")).toBeTruthy();
  expect(mut.containsNumbers("2")).toBeTruthy();
  expect(mut.containsNumbers("3")).toBeTruthy();
  expect(mut.containsNumbers("4")).toBeTruthy();
  expect(mut.containsNumbers("5")).toBeTruthy();
  expect(mut.containsNumbers("6")).toBeTruthy();
  expect(mut.containsNumbers("7")).toBeTruthy();
  expect(mut.containsNumbers("8")).toBeTruthy();
  expect(mut.containsNumbers("9")).toBeTruthy();
  expect(mut.containsNumbers("0")).toBeTruthy();
});

test("containsNumbers -- many numbers returns true", () => {
  const input = "1234567890";
  expect(mut.containsNumbers(input)).toBeTruthy();
});
