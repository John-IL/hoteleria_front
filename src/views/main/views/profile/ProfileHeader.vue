<template>
  <div>
    <div class="container mt-4" v-if="interfaceMode === 1">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img
              :src="headerData.avatar"
              class="card-img-top"
              alt="Profile image"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ headerData.full_name }}
              </h5>
              <p class="card-text">{{ headerData.role_name }}</p>
              <p class="card-text">{{ headerData.email }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{ bio }}</li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <b-card no-body fluid>
            <b-tabs pills card justified fill>
              <b-tab title="Tab 1" active>
                <b-card-text>
                  <FilterSlot
                    :tableColumns="[]"
                    :dataMeta="dataMeta"
                    :paginate="paginate"
                    :filter="filters"
                    :filterPrincipal="filterPrincipal"
                  >
                    <template #table>
                      <DiegoTable
                        ref="ref-table-check-processing"
                        :current-page="paginate.currentPage"
                        :per-page="paginate.perPage"
                        primary-key="id"
                        show-empty
                        empty-text="No matching records found"
                        class="font-small-3"
                        :dataMeta="dataMeta"
                        :paginate="paginate"
                        :filter="filters"
                        :filterPrincipal="filterPrincipal"
                        @reload="$refs['ref-table-check-processing'].refresh()"
                        :isBusy="isBusy"
                        small
                        sticky-header
                        :items="[
                          { id: 1, name: 'foo', age: 20, gender: 'Female' },
                          { id: 2, name: 'foo', age: 20, gender: 'Female' },
                          { id: 3, name: 'foo', age: 20, gender: 'Female' },
                          { id: 4, name: 'foo', age: 20, gender: 'Female' },
                          { id: 5, name: 'foo', age: 20, gender: 'Female' },
                          { id: 6, name: 'foo', age: 20, gender: 'Female' },
                        ]"
                        :fields="fields"
                        responsive
                        striped
                      >
                      </DiegoTable>
                    </template>
                  </FilterSlot>
                </b-card-text>
              </b-tab>
              <b-tab title="Tab 2"
                ><b-card-text>Tab contents 2</b-card-text></b-tab
              >
              <b-tab title="Tab 3"
                ><b-card-text>Tab contents 3</b-card-text></b-tab
              >
              <b-tab title="Tab 4"
                ><b-card-text>Tab contents 4</b-card-text></b-tab
              >
              <b-tab title="Tab 5"
                ><b-card-text>Tab contents 5</b-card-text></b-tab
              >
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>

    <div class="container mt-4" v-if="interfaceMode === 2">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img
              :src="headerData.avatar"
              class="card-img-top"
              alt="Profile image"
            />
            <div class="card-body">
              <h5 class="card-title">{{ headerData.full_name }}</h5>
              <p class="card-text">{{ headerData.email }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{ bio }}</li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div>
              <b-card no-body>
                <b-tabs pills card vertical>
                  <b-tab title="Tab 1" active
                    ><b-card-text>
                      <b-skeleton-table v-if="isLoading" />
                      <b-table
                        :items="filteredItems"
                        :fields="fields"
                        v-else
                        responsive="sm" /></b-card-text
                  ></b-tab>
                  <b-tab title="Tab 2"
                    ><b-card-text>Tab contents 2</b-card-text></b-tab
                  >
                  <b-tab title="Tab 3"
                    ><b-card-text>Tab contents 3</b-card-text></b-tab
                  >
                  <b-tab title="Tab 4"
                    ><b-card-text>Tab contents 3</b-card-text></b-tab
                  >
                  <b-tab title="Tab 5"
                    ><b-card-text>Tab contents 3</b-card-text></b-tab
                  >
                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4" v-if="interfaceMode === 3">
      <b-row>
        <b-col md="4">
          <b-card>
            <b-img
              :src="headerData.avatar"
              fluid
              alt="Profile image"
              class="w-100"
            />
            <div class="mt-3">
              <h5 class="mb-0">{{ headerData.full_name }}</h5>
              <span>{{ headerData.email }}</span>
            </div>
          </b-card>
        </b-col>
        <b-col md="8">
          <b-card>
            <h3>About Me</h3>
            <p>{{ bio }}</p>
          </b-card>
          <b-card>
            <h3>My Posts</h3>
            <b-list-group>
              <b-list-group-item v-for="post in posts" :key="post.id">
                {{ post.title }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-card
      v-if="interfaceMode === 4"
      class="profile-header mb-2"
      img-src="/img/timeline.aa03c008.jpg"
      img-top
      alt="cover photo"
      body-class="p-0"
    >
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-img :src="headerData.avatar" rounded fluid alt="profile photo" />
          </div>
          <div class="profile-title ml-3">
            <h2 class="text-white">
              {{ headerData.full_name }}
            </h2>
            <p class="text-white">
              {{ headerData.role_name }}
            </p>
          </div>
        </div>
      </div>

      <div class="profile-header-nav">
        <b-navbar toggleable="md" type="light">
          <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
            <feather-icon icon="AlignJustifyIcon" size="21" />
          </b-navbar-toggle>

          <b-collapse id="nav-text-collapse" is-nav>
            <b-tabs pills class="profile-tabs mt-1 mt-md-0" nav-class="mb-0">
              <template #tabs-start>
                <b-nav-item role="presentation" active class="font-weight-bold">
                  <span class="d-none d-md-block">Feed</span>
                  <feather-icon icon="RssIcon" class="d-block d-md-none" />
                </b-nav-item>
                <b-nav-item role="presentation" class="font-weight-bold">
                  <span class="d-none d-md-block">About</span>
                  <feather-icon icon="InfoIcon" class="d-block d-md-none" />
                </b-nav-item>
                <b-nav-item role="presentation" class="font-weight-bold">
                  <span class="d-none d-md-block">Photos</span>
                  <feather-icon icon="ImageIcon" class="d-block d-md-none" />
                </b-nav-item>
                <b-nav-item role="presentation" class="font-weight-bold">
                  <span class="d-none d-md-block">Friends</span>
                  <feather-icon icon="UsersIcon" class="d-block d-md-none" />
                </b-nav-item>
              </template>

              <template #tabs-end>
                <b-button variant="primary" class="ml-auto">
                  <feather-icon icon="EditIcon" class="d-block d-md-none" />
                  <span class="font-weight-bold d-none d-md-block">Edit</span>
                </b-button>
              </template>
            </b-tabs>
          </b-collapse>
        </b-navbar>
      </div>
    </b-card>
  </div>
</template>

<script>
import TableSkeleton from "@/views/commons/skeletons/TableSkeleton.vue";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import DiegoTable from "@/views/commons/table/DiegoTable.vue";
// import {
//   BCard,
//   BImg,
//   BNavbar,
//   BNavbarToggle,
//   BCollapse,
//   BTabs,
//   BNavItem,
//   BButton,
// } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    TableSkeleton,
    FilterSlot,
    DiegoTable,
    // BCard,
    // BTabs,
    // BButton,
    // BNavItem,
    // BNavbar,
    // BNavbarToggle,
    // BCollapse,
    // BImg,
  },
  data() {
    return {
      searchQuery: "",
      filterPrincipal: {
        type: "input",
        inputType: "text",
        placeholder: "Search...",
        model: "",
      },
      paginate: {
        currentPage: 1,
        perPage: 10,
        startPage: 1,
        toPage: 1,
      },
      dataMeta: {
        from: 0,
        to: 0,
        of: 0,
      },

      isBusy: true,
      isLoading: true,
      search: "",
      filter: null,
      items: [],
      interfaceMode: 1,
      filteredItems: [],
      filterOptions: [
        { value: null, text: "All" },
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
      ],
      tableColumns() {
        return [];
      },
      fields: [
        { key: "name", label: "Name" },
        { key: "gender", label: "Gender" },
        { key: "age", label: "Age" },
      ],
      activeTab: 1,
      username: "John Doe",
      email: "johndoe@example.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget ex euismod, venenatis nisi ac, venenatis ipsum. Fusce a ex tincidunt, euismod mauris non, euismod odio.",
      profileImageUrl: "https://via.placeholder.com/150",
      filters: [
        {
          type: "b-form-datepicker",
          margin: true,
          showLabel: true,
          label: "From",
          placeholder: "Date",
          class: "font-small-3",
          model: null,
          locale: "en",
          dateFormatOptions: {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          },
          cols: 6,
        },
      ],
      posts: [
        {
          id: 1,
          title: "My first post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 2,
          title: "My second post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 3,
          title: "My third post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    };
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getWidth(width) {
      if (typeof width === "number") {
        return `${width}px`;
      } else {
        return width;
      }
    },

    getItems() {
      // simular una llamada a la API con un retraso de 2 segundos
      setTimeout(() => {
        this.items = [
          { name: { first: "John", last: "Doe" }, gender: "male", age: 27 },
          { name: { first: "Jane", last: "Doe" }, gender: "female", age: 32 },
          { name: { first: "Bob", last: "Smith" }, gender: "male", age: 41 },
          {
            name: { first: "Alice", last: "Johnson" },
            gender: "female",
            age: 19,
          },
        ];
        this.filteredItems = this.items;
        this.isLoading = false;
      }, 2000);
    },
    filterItems() {
      let filtered = this.items;
      if (this.filter) {
        filtered = filtered.filter((item) => item.gender === this.filter);
      }
      if (this.search) {
        filtered = filtered.filter(
          (item) =>
            item.name.first.toLowerCase().includes(this.search.toLowerCase()) ||
            item.name.last.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      this.filteredItems = filtered;
    },
  },
  created() {
    // posible values interfaceMode 1 2 3 4
    setInterval(() => {
      this.isBusy = !this.isBusy;
      // this.interfaceMode =
      this.interfaceMode === 4 ? 1 : this.interfaceMode + 1;
    }, 1500);
    // console.log(this.headerData);
  },
};
</script>
