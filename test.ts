//import { Replace } from "string-ts";
const text = "red,hover:green,lg:[orange,hover:[pink,center,cc:[ref,fe]]]";
const text2 = "red,hover:green,lg:orange,lg:hover:pink,lg:hover:center";
// step 2 ==>"red,hover:green,lg:[orange,hover:pink,hover:center]"
// goal =  'red,hover:green,lg:orange,lg:hover:pink,lg:hover:center'

// step 2 ==>"red,hover:green,lg:[orange]"
const Temptext = text;
/*
const initialFn = (text: string) => {
    const Temptext = text;
    const laRegex = (x: string): string => {
        const nestedBrackets = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");
        const bool = nestedBrackets.test(x);

        if (bool) {
            TempInput = nestedBrackets.exec(x)?.[0] ?? TempInput;
            const theMatch: string = x.match(nestedBrackets)?.groups?.css ?? "error";
            TempBefore = x.match(nestedBrackets)?.groups?.before ?? TempBefore;
            return laRegex(theMatch as string);
        } else {
            //console.log(TempInput);

            const replacing = Temptext.replace(TempInput, beforeAndCss);
            const isNextRecursion = nestedBrackets.test(replacing);

            //return isNextRecursion ? laRegex(replacing) : replacing;
        }
    };
    laRegex(text);
};
*/
class TailwindCompressor {
    texte: string;
    constructor(texte: string) {
        this.texte = texte;
        this.Temp.set("Initial", texte);
    }
    get showTexte() {
        return this.texte
    }

    set showTexte(x: string) {
        this.showTexte.replace(this.Temp.get("Input") ?? "error", x)
    }

    #nestedBrackets = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");
    numberOfRegex = 0;

    Temp: Map<string, string> = new Map([
        ["PreviousInput", ""],
        ["Input", ""],
        ["Before", ""],
        ["Css", ""],
    ]);
    isNestingRegex(x = this.texte): boolean {
        const yesRegex = this.#nestedBrackets.test(x);
        if (yesRegex) {
            this.numberOfRegex++;
            this.TempInputUpdater(x);
        } else {
            this.numberOfRegex--;
            this.Temp.delete("Input");
        }
        return yesRegex;
    }
    TempInputUpdater(x: string) {
        this.Temp.set("Input", this.#nestedBrackets.exec(x)?.[0] as string);
    }
    TempBeforeUpdater() {
        const before = this.Temp.get("Input")?.match(this.#nestedBrackets)?.groups?.before ?? "error";
        if (before) {
            this.Temp.set("Before", before);
        } else {
            this.Temp.delete("Before");
        }
    }
    TempCssUpdater() {
        const css = this.Temp.get("Input")?.match(this.#nestedBrackets)?.groups?.css ?? "error";
        if (css) {
            this.Temp.set("Css", css as string);
        } else {
            this.Temp.delete("Css");
        }
    }
    recursiveFnRegex(x = this.showTexte) {
        if (this.isNestingRegex(x)) {
            if (this.numberOfRegex < 19) {
                this.TempBeforeUpdater();
                this.TempCssUpdater();
                this.recursiveFnRegex(this.Temp.get("Before"))
            }
        } else {
            console.log("this.numberOfRegex🔸🔸 ", this.numberOfRegex);
            this.numberOfRegex > 0 ? this.beforeAndCss(x) : console.log("finish");
        }
    }
    beforeAndCss(x: string): string {
        this.showTexte = x
            .split(",")
            .map((e: string) => `${this.Temp.get("Before")}:${e}`)
            .join(",");
        return this.showTexte
    }
}

const cc = new TailwindCompressor("red,hover:green,lg:[orange,hover:[pink,center]]");


cc.recursiveFnRegex();
console.log("cc.isNestingRegex()🔸🔸 ", cc.Temp);
console.log("number Of Regex🔸🔸 :", cc.numberOfRegex);
