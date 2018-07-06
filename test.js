let a = [0, 1, 2, 3, 4];
let b = a.slice();
console.log(a, b)

a[0] = 7;
console.log(a, b)

let c = {
  a: "a",
  b: "b"
}

let d = c;
console.log(c, d)
d["a"] = "d";
console.log(c, d)

