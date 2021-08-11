<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-4">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src="../assets/logo.svg" alt="" />
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <form class="d-flex mt-4 mb-2 my-lg-0">
                        <input
                            class="form-control"
                            type="search"
                            placeholder="Search by name"
                            aria-label="Search by name"
                            v-model="searchByName"
                        />
                    </form>
                    <ul class="navbar-nav ms-auto">
                        <div
                            class="
                                btn btn-success
                                text-white
                                fw-bolder
                                shadow-sm
                                lh-base
                            "
                            data-bs-toggle="modal"
                            data-bs-target="#addPhoto"
                        >
                            Add a Photo
                        </div>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Modal -->
        <div
            class="modal fade"
            id="addPhoto"
            tabindex="-1"
            aria-labelledby="photoForm"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="photoForm">
                            Add a new photo
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="col-form-label">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Add a label for photo"
                                    v-model="label"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="imageURL" class="col-form-label"
                                    >Photo URL</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="imageURL"
                                    placeholder="https://images.unsplash.com/<your_image_url>"
                                    v-model="imageURL"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="userPassword" class="col-form-label"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="userPassword"
                                    v-model="userPassword"
                                    placeholder="********"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            v-if="
                                this.label !== null &&
                                this.label !== '' &&
                                this.imageURL !== '' &&
                                this.imageURL !== null
                            "
                            @click="addPhoto"
                            data-bs-dismiss="modal"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    computed: {
        label: {
            get() {
                return this.$store.state.photoCredentials.label;
            },
            set(value) {
                this.$store.commit("updateLabel", value);
            },
        },
        searchByName: {
            get() {
                return this.$store.state.searchByName;
            },
            set(value) {
                this.$store.commit("searchByName", value);
            },
        },
        userPassword: {
            get() {
                return this.$store.state.photoCredentials.userPassword;
            },
            set(value) {
                this.$store.commit("updateUserPassword", value);
            },
        },
        imageURL: {
            get() {
                return this.$store.state.photoCredentials.imageURL;
            },
            set(value) {
                this.$store.commit("updateImageURL", value);
            },
        },
    },
    methods: {
        async addPhoto() {
            await this.$store.dispatch("addPhoto");
            this.$store.commit("resetCredentials")
            this.$store.dispatch("getImages")
        },
    },
};
</script>

<style>
</style>