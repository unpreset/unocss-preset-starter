import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTagify,
	presetWind,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

import { presetStarter } from 'unocss-preset-starter'

export default defineConfig({
	//extractors: [extractorSvelte],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	presets: [
		presetStarter(),
		presetWind(),
		presetAttributify({ ignoreAttributes: ["block"] }),
		presetTagify(),
		presetIcons({
			cdn: "https://esm.sh/",

			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
				height: "1.2em",
				width: "1.2em",
			},
			collections: {
				"i-": async (iconName) => {
					return await fetch(`src/icons/${iconName}.svg`).then((res) => {
						return res.text();
					});
				},
			},
		}),
	],
	content: {
		pipeline: {
			include: [
				// the default
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				// include js/ts files
				"src/**/*.{js,ts}",
			],

			exclude: [
				"node_modules",
				"dist",
				".git",
				".husky",
				".vscode",
				"public",
				"build",
				"mock",
				"./stats.html",
			],
		},
	},

	theme: {
		colors: {
			primary: "oklch(35.46% 0.024 188.04)",
			secondary: "#3E6259",
			ternary: "#5B8266",
			text: {
				dark: "#212922",
				light: "#AEF6C7",
			},
		},

		fontFamily: {
			primary: "playfair-display",
			secondary: "Yrsa",
			ternary: "hind guntur",
			title: "Sunlight",
		},
		fontSize: {
			cqi: ["clamp(0.60rem, .65cqi, .9cqi)", "1"],
			xs: ["clamp(0.78rem, calc(0.77rem + 0.03vw), 0.80rem)", "1"],
			sm: ["clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem)", "1"],
			base: ["clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem)", "1"],
			md: ["clamp(1.35rem, calc(1.28rem + 0.37vw), 1.56rem)", "1"],
			lg: ["clamp(1.62rem, calc(1.50rem + 0.58vw), 1.95rem)", "1"],
			xl: ["clamp(1.94rem, calc(1.77rem + 0.87vw), 2.44rem)", "1"],
			"2xl": ["clamp(2.33rem, calc(2.08rem + 1.25vw), 3.05rem)", "1"],
			"3xl": ["clamp(2.80rem, calc(2.45rem + 1.77vw), 3.82rem)", "1"],
			"4xl": ["clamp(3.36rem, calc(2.87rem + 2.45vw), 4.77rem)", "1"],
			"5xl": ["clamp(4.03rem, calc(3.36rem + 3.36vw), 5.96rem)", "1"],
			"6xl": ["clamp(4.84rem, calc(3.93rem + 4.54vw), 7.45rem)", "1"],
		},
		container: {
			center: true,
		},
		breakpoints: {
			xs: "280px",
			sm: "480px",
			md: "720px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1680px",
		},
		aspectRatio: {
			"4/3": "4 / 3",
			"1/3": "1 / 3",
			"1/2": "1 / 2",
		},
	},

	safelist: "dark light prose prose-sm m-auto text-left".split(" "),
});
