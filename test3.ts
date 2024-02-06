let arrr = ["lg", "md", "md", ["hover", ["first", "pink",["test"]]]];
arrr = ["lg", "md", "md", ["first", "pink"]];
// const resultHope = [
//     ["lg", "md", "hover", "first"],
//     ["lg", "md", "hover", "pink"],
// ];
function eq(resultHope: string[][], arr: unknown): boolean {
    return resultHope === arr;
}
class RecursiveTest {
    array: string[];
    constructor(array: string[]) {
        this.array = array;
    }
    get _array() {
        return this.array;
    }
    set _array(x) {
        this.array = x;
    }
    unshitArray() {
        const tempSet = new Set();
        for (const e of this._array) {
            if (Array.isArray(e)) {
                for (const r of [...tempSet].reverse()) {
                    e.unshift(r);
                }
            } else {
                tempSet.add(e);
            }
        }
    }
    fooor() {
        const tempSet = new Set();
        for (let index = this._array.length - 1; index > 0; index--) {
            const element = this._array[index];
            if (Array.isArray(element)) {
                //console.log('element🔸🔸 ', element);
                for (const r of tempSet) {
                    element.unshift(r);
                }
            } else {
                tempSet.add(element);

            }
        }
    }
    thirt() {
        const tempSet = new Set();
        for (let index = 0; index < this._array.length; index++) {
            const e = this._array[index];
            if (!Array.isArray(e)) {
                tempSet.add(e);
            }
            else {
                for (const iterator of tempSet) {
                    e.unshift(iterator)
                }
            }
        }
    }
    four(){
        if (!this.isLastIteration){

            const splicc = Array.from(this._array.splice(this._array.length - 1, 1));
            const reversed: string[] = [...new Set(this._array)].reverse()
            // biome-ignore lint/complexity/noForEach: <explanation>
            reversed.forEach(e => splicc.unshift(e))
            this._array = splicc
            //console.log(this.isLastIteration)
        }
    }

    get everyItemIsArray(): boolean {
        return this._array.every((e) => Array.isArray(e));
    }
    get isLastIteration(){
        /**
         * cest bon ca marce
         * 
         */
        return !this._array?.flat().some(Array.isArray);

    }
}

const tee = new RecursiveTest(arrr);

tee.four();
//console.log("🦄🦄",["lg", "md", "hover", ["first", "pink"]]);
console.log("array is :::::::", tee._array);
const ezgp = tee.isLastIteration
console.log('isLastIteration ', ezgp);

console.log("array is :::::::", tee._array);
//console.log("2", tee._array);
/*
function a(array) {
    const s = new Set();
    array.forEach((e) => {
        if (!Array.isArray(e)) {
            s.add(e);
        } else {
            [...s].reverse().forEach((r) => e.unshift(r));
            return e;
        }
    });
}
*/
function everyItemIsArray(array: string[][]) {
    return array.every((e:string[]) => Array.isArray(e));
}

function recursive(array) {
    if (!everyItemIsArray(array)) {
        const rez = a(array);
        console.log(rez);
    } else {
        console.log("fin");
    }
}
