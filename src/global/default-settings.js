export default {
    options: {
        compressImages: {
            label: 'Compress images',
            checked: true
        },
        slugifyFileNames: {
            label: 'Slugify file names',
            checked: true
        },
        // convertPngsToJpgs: {
        //     label: 'Convert PNGs to JPGs',
        //     checked: false
        // },
        addDashAfterName: {
            label: 'Add dash after breakpoint',
            checked: true
        }
    },
    breakpoints: [
        {
            name: 'tiny',
            width: 480,
            height: 640,
            active: true
        },
        {
            name: 'small',
            width: 640,
            height: 640,
            active: true
        },
        {
            name: 'medium',
            width: 760,
            height: 640,
            active: true
        },
        {
            name: 'large',
            width: 992,
            height: 640,
            active: true
        },
        {
            name: 'giant',
            width: 1200,
            height: 640,
            active: true
        },
        {
            name: 'huge',
            width: 1660,
            height: 640,
            active: true
        }
    ]
}