import {
  swalWarningIcon,
} from "@/icons/statusIcons";

export default {
  data() {
    return {};
  },
  computed: {
    isDarkSkin() {
      return this.$store.getters["appConfig/skin"] === "dark";
    },
    bgTabsNavs() {
      //getters
      return this.$store.getters["appConfig/skin"] === "dark"
        ? "nav-dark-tabs"
        : "nav-light-tabs";
    },
  },
  methods: {
    showConfirmSwal(
      title = "Are you sure?",
      text = "You won't be able to revert this!",
      config = {}
    ) {
      return this.$swal({
        title,
        text,
        imageUrl: swalWarningIcon,
        imageWidth: 70,
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "btn btn-primary mr-1",
          cancelButton: "btn btn-outline-danger",
          title: "text-dark"
        },
        ...config,
      });
    },

    async forceFileDownloadPdfWithDownload(response, fileName) {
      const url = window.URL.createObjectURL(
          new Blob([response], {
              type: "application/pdf",
          })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download=fileName
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
  },
  },
};

