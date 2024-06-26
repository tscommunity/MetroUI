
window.calendarDrawDayTest = (date, cell) => {
    if (date.day() % 2 === 0) {
        cell.addClass("bg-red fg-white")
    }
}

window.templateData = {
    skills: ["javascript", "html", "css"],
    showSkills: true
};

import {Metro5} from "../src/index.js"
import "../src/icons/mif.css"
import * as CommonCss from "../src/common"
import * as Components from "../src/components"
import * as Routines from "../src/routines"

import tableUrl from './data/table.json?url'
import {log} from "util";

window.Metro = new Metro5({
    removeCloakTimeout: 1000,
    replaceHint: true,
    onInit: ()=>{
        console.log("Metro5 Initialed.")
        globalThis.Notify = new Components.Notify()
        globalThis.Toast = new Components.Toast()
    }
})

let fileIndex = 0;

window.addTab = function () {
    const tabs = Metro5.getPlugin("#tabs1", "tabs");
    tabs.addTab({
        icon: "mif-document-file-css",
        caption: `noname${fileIndex}.css`,
        canClose: true
    });
    fileIndex++;
};

Routines.github('olton/Metro-UI-CSS').then((data) => {
    console.log(data)
})

// const obj = [{
//         albumId: 1,
//         id: 1,
//         title: "accusamus beatae ad facilis cum similique qui sunt",
//         url: "https://via.placeholder.com/600/92c952",
//         thumbnailUrl: "https://via.placeholder.com/150/92c952"
//     },
//     {
//         albumId: 1,
//         id: 2,
//         title: "reprehenderit est deserunt velit ipsam",
//         url: "https://via.placeholder.com/600/771796",
//         thumbnailUrl: "https://via.placeholder.com/150/771796"
//     }]

const ds = new Components.Dataset({
    url: "https://jsonplaceholder.typicode.com/photos"
})

ds
    .url("https://jsonplaceholder.typicode.com/photos?_page=$1&_limit=$2")
    .filters(item => item.title.includes('qui'))
    .after(item => Object.values(item))
    .get(2, 10)
    .then(photos => {
        console.log(photos)
    })


// const ds = new Components.Dataset({source: obj})
//
// ds.get().then(items => console.log(items))

globalThis.downloadCsv = function(array){
    const csv = new Routines.Csv({header: true})

    if (array) {
        const data = [
            [1, 2, 3],
            [4, 5, 6]
        ]

        csv.data(data).array2csv().download('array.csv')
    } else {
        const data = [
            {
                firstName: 'Idorenyin',
                lastName: 'Udoh'
            },
            {
                firstName: 'Loyle',
                lastName: 'Carner'
            },
            {
                firstName: 'Tamunotekena',
                lastName: 'Dagogo'
            }
        ]
        csv.json2csv(data).download('json.csv')
    }
}

globalThis.showInfobox = () => {
    infobox({overlayColor: "#f00", message: "lorem Ipsum", title: "Infobox", clsInfobox: "alert"})
}

globalThis.resizeBox = () => {
    Animation.animate({
        el: document.querySelector(".testbox"),
        draw: {
            width: 0
        }
    })
}