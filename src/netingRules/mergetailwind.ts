export class MakeString {
    array: string[];
    category: Category
    constructor(array: string[], category: Category) {
        this.array = array;
        this.category = category;
    }

    get _array(): string[] {
        return this.array;
    }

    set _array(array: string[]) {
        this.array = array;
    }
    AddCatergoryToArray() {

        this.array = this._array.toSpliced(this._array.length - 1, 0, this.category);

    }
    removeDuplicateInArr(): string[] {
        const sett = new Set<string>();
        const arr: string[] = [];
        for (let index = 0; index < this._array.length; index++) {
            if (index < this._array.length - 2) {
                sett.add(this._array[index]);
            } else {
                arr.push(this._array[index]);
            }
        }
        this._array = Array.from(sett).concat(arr);
        return Array.from(sett).concat(arr);
    }

    mergeTailwind(): string {
        let str = "";
        for (let i = 0; i < this._array.length; i++) {
            str += i === this._array.length - 1
                ? "-" : i > 0
                    ? ":" : "";
            str += this._array[i];
        }
        return str;
    }
    get finish() {
        this.AddCatergoryToArray()
        this.removeDuplicateInArr()
        return this.mergeTailwind()
    }
}

const mergeArrayToAString = new MakeString(["lg", "hover", "first", "orange"], "bg")
