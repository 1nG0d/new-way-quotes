import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import { copy } from "@web/rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import svg from "rollup-plugin-svg";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  context: "window",
  output: [
    {
      sourcemap: true,
      format: "iife",
      name: "quotesWidget",
      file: "public/build/bundle.js",
    },
  ],
  plugins: [
    svelte({
      // enable run-time checks when not in production
      compilerOptions: {
        dev: !production,
      },
      // we'll extract any component CSS out into
      // a separate file - better for performance
      emitCss: true,
    }),
    css({ output: "bundle.css" }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs({
      transformMixedEsModules: true,
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    copy({ patterns: "**/*.{svg,jpg,json}", rootDir: "src/" }),
    svg(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
