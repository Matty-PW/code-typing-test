function code(strings) {
    const lines = strings
        .join("")
        .replace(/^\n/, "")
        .replace(/\n[ \t]*$/, "")
        .split("\n")
    const indent = Math.min(
        ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length),
    )
    return lines.map((l) => l.slice(indent)).join("\n")
}


export const snippets = {
  javascript: [
    code`
      function debounce(fn, delay) {
        let timer = null;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
        };
      }
    `,
    code`
      const users = await fetch("/api/users")
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return [];
        });
    `,
    code`
      const groupBy = (items, key) =>
        items.reduce((acc, item) => {
          (acc[item[key]] ||= []).push(item);
          return acc;
        }, {});
    `,
    code`
      class Queue {
        #items = [];
        enqueue(item) {
          this.#items.push(item);
        }
        dequeue() {
          return this.#items.shift();
        }
      }
    `,
    code`
      export default function Counter() {
        const [count, setCount] = useState(0);
        return (
          <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
          </button>
        );
      }
    `,
    code`
      for (let i = 1; i <= 15; i++) {
        if (i % 15 === 0) console.log("Hello World");
        else if (i % 3 === 0) console.log("Hello");
        else if (i % 5 === 0) console.log("World");
        else console.log(i);
      }
    `,
    code`
      const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      async function retry(fn, attempts = 3) {
        for (let i = 0; i < attempts; i++) {
          try {
            return await fn();
          } catch {
            await sleep(2 ** i * 100);
          }
        }
      }
    `,
  ],

  typescript: [
    code`
      interface User {
        id: number;
        name: string;
        email?: string;
      }

      function greet(user: User): string {
        return \`Hello, \${user.name}!\`;
      }
    `,
    code`
      type Result<T, E = Error> =
        | { ok: true; value: T }
        | { ok: false; error: E };
    `,
    code`
      function pick<T, K extends keyof T>(obj: T, keys: K[]) {
        const out = {} as Pick<T, K>;
        for (const key of keys) {
          out[key] = obj[key];
        }
        return out;
      }
    `,
    code`
      enum Direction {
        Up = "UP",
        Down = "DOWN",
      }

      const move = (dir: Direction): void => {
        console.log(\`Moving \${dir.toLowerCase()}\`);
      };
    `,
    code`
      async function getJson<T>(url: string): Promise<T> {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        return (await res.json()) as T;
      }
    `,
    code`
      const isString = (value: unknown): value is string =>
        typeof value === "string";

      const names = ["a", 1, "b"].filter(isString);
    `,
  ],

  python: [
    code`
      def fibonacci(n):
          a, b = 0, 1
          for _ in range(n):
              yield a
              a, b = b, a + b
    `,
    code`
      class Stack:
          def __init__(self):
              self.items = []

          def push(self, item):
              self.items.append(item)

          def pop(self):
              return self.items.pop()
    `,
    code`
      with open("data.txt") as f:
          lines = [line.strip() for line in f]

      counts = {}
      for word in " ".join(lines).split():
          counts[word] = counts.get(word, 0) + 1
    `,
    code`
      import json

      def load_config(path="config.json"):
          try:
              with open(path) as f:
                  return json.load(f)
          except FileNotFoundError:
              return {}
    `,
    code`
      squares = {x: x ** 2 for x in range(10) if x % 2 == 0}
      print(sorted(squares.items(), key=lambda kv: -kv[1]))
    `,
    code`
      def binary_search(arr, target):
          lo, hi = 0, len(arr) - 1
          while lo <= hi:
              mid = (lo + hi) // 2
              if arr[mid] == target:
                  return mid
              if arr[mid] < target:
                  lo = mid + 1
              else:
                  hi = mid - 1
          return -1
    `,
    code`
      @dataclass
      class Point:
          x: float
          y: float

          def distance(self, other):
              dx = self.x - other.x
              dy = self.y - other.y
              return math.hypot(dx, dy)
    `,
  ],

  rust: [
    code`
      fn main() {
          let numbers = vec![1, 2, 3, 4, 5];
          let sum: i32 = numbers.iter().sum();
          println!("sum = {}", sum);
      }
    `,
    code`
      #[derive(Debug, Clone)]
      struct Point {
          x: f64,
          y: f64,
      }

      impl Point {
          fn norm(&self) -> f64 {
              (self.x * self.x + self.y * self.y).sqrt()
          }
      }
    `,
    code`
      fn divide(a: f64, b: f64) -> Result<f64, String> {
          if b == 0.0 {
              return Err("division by zero".to_string());
          }
          Ok(a / b)
      }
    `,
    code`
      enum Shape {
          Circle(f64),
          Rect(f64, f64),
      }

      fn area(shape: &Shape) -> f64 {
          match shape {
              Shape::Circle(r) => 3.14159 * r * r,
              Shape::Rect(w, h) => w * h,
          }
      }
    `,
    code`
      use std::collections::HashMap;

      let mut counts = HashMap::new();
      for word in text.split_whitespace() {
          *counts.entry(word).or_insert(0) += 1;
      }
    `,
    code`
      let evens: Vec<i32> = (1..=20)
          .filter(|n| n % 2 == 0)
          .map(|n| n * n)
          .collect();
    `,
  ],

  go: [
    code`
      func main() {
          nums := []int{1, 2, 3, 4, 5}
          total := 0
          for _, n := range nums {
              total += n
          }
          fmt.Println("total:", total)
      }
    `,
    code`
      func readFile(path string) ([]byte, error) {
          data, err := os.ReadFile(path)
          if err != nil {
              return nil, fmt.Errorf("read %s: %w", path, err)
          }
          return data, nil
      }
    `,
    code`
      type Server struct {
          Addr    string
          Handler http.Handler
      }

      func (s *Server) Start() error {
          return http.ListenAndServe(s.Addr, s.Handler)
      }
    `,
    code`
      ch := make(chan int)
      go func() {
          for i := 0; i < 3; i++ {
              ch <- i
          }
          close(ch)
      }()
      for v := range ch {
          fmt.Println(v)
      }
    `,
    code`
      func Map[T, U any](xs []T, f func(T) U) []U {
          out := make([]U, 0, len(xs))
          for _, x := range xs {
              out = append(out, f(x))
          }
          return out
      }
    `,
    code`
      switch day := time.Now().Weekday(); day {
      case time.Saturday, time.Sunday:
          fmt.Println("weekend")
      default:
          fmt.Println("weekday")
      }
    `,
  ],

  c: [
    code`
      #include <stdio.h>

      int main(void) {
          for (int i = 0; i < 10; i++) {
              printf("%d\\n", i * i);
          }
          return 0;
      }
    `,
    code`
      int factorial(int n) {
          if (n <= 1) {
              return 1;
          }
          return n * factorial(n - 1);
      }
    `,
    code`
      typedef struct {
          char name[32];
          int age;
      } Person;

      void greet(const Person *p) {
          printf("Hi %s (%d)\\n", p->name, p->age);
      }
    `,
    code`
      void swap(int *a, int *b) {
          int tmp = *a;
          *a = *b;
          *b = tmp;
      }
    `,
    code`
      int *buf = malloc(n * sizeof(int));
      if (buf == NULL) {
          perror("malloc");
          exit(EXIT_FAILURE);
      }
      memset(buf, 0, n * sizeof(int));
      free(buf);
    `,
    code`
      size_t my_strlen(const char *s) {
          size_t len = 0;
          while (s[len] != '\\0') {
              len++;
          }
          return len;
      }
    `,
  ],

  html: [
    code`
      <nav class="menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    `,
    code`
      <form action="/login" method="post">
        <label for="email">Email</label>
        <input id="email" type="email" required />
        <button type="submit">Sign in</button>
      </form>
    `,
    code`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Hello</title>
        </head>
        <body>
          <h1>Hello, world</h1>
        </body>
      </html>
    `,
  ],

  css: [
    code`
      .card {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        border-radius: 8px;
      }
    `,
    code`
      :root {
        --bg: #323437;
        --text: #d1d0c5;
        --accent: #e2b714;
      }

      body {
        background: var(--bg);
        color: var(--text);
      }
    `,
    code`
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
    `,
    code`
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }
    `,
  ],
}

export const languages = Object.keys(snippets)


export function pickSnippet(language, current = null) {
  const pool = snippets[language] ?? snippets.javascript
  const candidates = pool.length > 1 ? pool.filter((s) => s !== current) : pool
  return candidates[Math.floor(Math.random() * candidates.length)]
}


