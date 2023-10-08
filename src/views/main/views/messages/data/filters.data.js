export default [
    {
        type: "b-form-datepicker",
        margin: true,
        showLabel: true,
        label: "From",
        placeholder: "Date",
        class: "font-small-2",
        model: null,
        locale: "es",
        dateFormatOptions: { year: 'numeric', month: '2-digit', day: 'numeric' },
        cols: 6,
    },
    {
        type: "b-form-datepicker",
        margin: true,
        showLabel: true,
        label: "To",
        placeholder: "Date",
        class: "font-small-2",
        model: null,
        locale: "es",
        dateFormatOptions: {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
        },
        cols: 6,
    },
    {
        type: "b-form-select",
        margin: true,
        showLabel: true,
        label: "Leido",
        options: [
            { value: 1, text: "Si" },
            { value: 0, text: "No" }
        ],
        model: null,
        cols: 12,
    },
];