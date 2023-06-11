import {isObjectType, merge, undef} from "../../routines";
import {Fetcher} from "../fetcher";

let DatasetDefaultOptions = {
    url: "",
    source: null,
    options: null
}

export class Dataset {
    _items = []
    _options = {}
    _fetcher = null
    _filters = []
    _before = []
    _after = []

    constructor(options) {
        if (typeof globalThis["metroDatasetSetup"] !== "undefined") {
            DatasetDefaultOptions = merge({}, DatasetDefaultOptions, globalThis["metroDatasetSetup"])
        }

        this._options = merge({}, DatasetDefaultOptions, options)
        this._fetcher = new Fetcher()
    }

    async get(...args){
        const {url, source, options} = this._options

        this._items = source ? isObjectType(source) : await this._fetcher
            .url(url)
            .options(options)
            .args(...args)
            .run()

        if (this._before.length) {
            for(let fn of this._before) {
                this._items = this._items.map(fn)
            }
        }

        if (this._filters.length) {
            for(let fn of this._filters) {
                this._items = this._items.filter(fn)
            }
        }

        if (this._after.length) {
            for(let fn of this._after) {
                this._items = this._items.map(fn)
            }
        }

        return this.items()
    }

    url(newUrl){
        if (undef(newUrl)) {
            return this._options.url
        }
        this._options.url = newUrl
        return this
    }

    options(newOptions){
        this._options = merge(this._options, newOptions)
        return this
    }

    filters(...fns){
        this._filters = [...fns]
        return this
    }

    after(...fns){
        this._after = [...fns]
        return this
    }

    before(...fns){
        this._before = [...fns]
        return this
    }

    items(){
        return this._items
    }
}