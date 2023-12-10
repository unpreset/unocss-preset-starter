const text = "red,hover:green,lg:[orange,hover:[pink,center,cc:[ref,fe]]]";
const text2 = "red,hover:green,lg:orange,lg:hover:pink,lg:hover:center";
// step 2 ==>"red,hover:green,lg:[orange,hover:pink,hover:center]"
// goal =  'red,hover:green,lg:orange,lg:hover:pink,lg:hover:center'

// step 2 ==>"red,hover:green,lg:[orange]"
const Temptext = text;

const initialFn = (text: string): string => {
    let TempBefore: string,
        TempInput = "";
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

            const beforeAndCss = x
                .split(",")
                .map((e: string) => `${TempBefore}:${e}`)
                .join(",");

            //console.log('beforeAndCss=>', beforeAndCss);

            const replacing = Temptext.replace(TempInput, beforeAndCss);
            const isNextRecursion = nestedBrackets.test(replacing);
            console.log({ isNextRecursion, replacing });

            //return isNextRecursion ? laRegex(replacing) : replacing;
        }
    };
    laRegex(text);
};

//const result = initialFn(text);

//console.log(result);

class TailwindCompressor {
    texte: string;
    constructor(texte: string) {
        this.texte = texte;
    }
    #nestedBrackets = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");
    numberOfRegex = 0;

    Temp = new Map([["LastInput", ""], ["Input", ""], ["Before", ""], ["Css", ""]])

    get ShowText() {
        return this.texte
    }
    isNestingRegex(x = this.texte): boolean {
        const yesRegex = this.#nestedBrackets.test(x);
        yesRegex ? this.numberOfRegex++ : this.numberOfRegex--;
        this.TempInputUpdater(x)
        return yesRegex;
    }
    TempBeforeUpdater(x: string) {
        const before = x.match(this.#nestedBrackets)?.groups?.before;
        if (before) {
            this.TempBefore = before;
        }
        this.TempBefore = "";
    }
    TempInputUpdater(x: string) {
        this.Temp.set("Input", this.#nestedBrackets.exec(x)?.[0] ?? "")
    }
    TempCssUpdater(x: string) {
        if (this.Temp.get("Input") !== "") {
            this.Temp.set("Css", this.#nestedBrackets.exec(x)?.[0] ?? "error css")
        }
    }
    beforeAndCss(x: string): string {
        return x
            .split(",")
            .map((e: string) => `${this.Temp.get("Before")}:${e}`)
            .join(",");
    }
    recursiveFnRegex(x = this.ShowText) {
        if (this.isNestingRegex(x)) {


            if (this.numberOfRegex < 9) {


                //this.recursiveFnRegex(this.TempInput)

            }
        }
        else {
            console.log('this.numberOfRegex🔸🔸 ', this.numberOfRegex);
            this.numberOfRegex > 0 ? this.beforeAndCss(x) : console.log("finish");


        }
    }
}

const cc = new TailwindCompressor(text);
cc.isNestingRegex()
console.log('cc.isNestingRegex()🔸🔸 ', cc.isNestingRegex());

console.log('cc.isNestingRegex()🔸🔸 ', cc.Temp);

