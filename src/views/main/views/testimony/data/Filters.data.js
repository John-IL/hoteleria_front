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
        label: "Habitacion",
        options: [],
        model: null,
        cols: 12,
    },
    {
        type: "b-form-select",
        margin: true,
        showLabel: true,
        label: "Estado",
        options: [
            { value: 1, text: "Activo" },
            { value: 2, text: "Desactivado" }
        ],
        model: null,
        cols: 6,
    },
    {
        type: "b-form-select",
        margin: true,
        showLabel: true,
        label: "Type",
        options: [
            { value: 1, text: "Client" },
            { value: 2, text: "Personal" }
        ],
        model: null,
        cols: 6,
    },
];