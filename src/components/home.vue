<template>
    <div class="home">
        <Header />
        <div class="container mt-5 ">
            <div class="error-box position-fixed" style="z-index:10; top:10%; right:5%;" v-if="errorPresent">
                <div class="btn btn-danger btn-md shadow-lg">{{error}}</div>
            </div>
            <div class="grid">
                <div
                    v-for="item in files"
                    :key="item"
                    class="
                        mb-4
                        rounded-3
                        border
                        position-relative
                        imageBox
                    "
                    v-show="searchByName == '' || searchByName == item.label"
                >
                    <img
                        :src="item.imageURL"
                        :alt="item.imageURL"
                        style="min-height:150px;"
                        class="rounded-3"
                    />
                    <div
                        class="
                            hover
                            d-flex
                            flex-column
                            justify-content-between
                            position-absolute
                            top-0
                            p-3
                        "
                    >
                        <button
                            type="button"
                            class="btn btn-sm btn-danger align-self-end"
                            style="width: fit-content"
                            data-bs-toggle="modal"
                            data-bs-target="#deletePhoto"
                            @click="addImageCredentials(item)"
                        >
                            Delete
                        </button>
                        <div class="lead text-white fw-bold">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div
            class="modal fade"
            id="deletePhoto"
            tabindex="-1"
            aria-labelledby="deleteConformation"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="photoForm">
                            Are you sure?
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
                                <label for="confirmPassword" class="col-form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="confirmPassword"
                                    placeholder="Please confirm your password"
                                    v-model="passwordForConfirmation"
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
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="deleteImage"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "./header.vue";

export default {
    name: "home",
    components: { Header },
    data() {
        return {
            imageCredentials: null,
        };
    },
    computed: {
        files() {
            return this.$store.getters.files;
        },
        searchByName() {
            return this.$store.getters.searchByName;
        },
        errorPresent() {
            return this.$store.getters.errorPresent;
        },
        error(){
            return this.$store.getters.error;
        },
        passwordForConfirmation: {
            get() {
                return this.$store.state.passwordForConfirmation;
            },
            set(value) {
                this.$store.commit("updatePasswordForConfirmation", value);
            },
        },
    },
    created() {
        this.$store.dispatch("getImages");
    },
    methods: {
        addImageCredentials(credentials) {
            this.imageCredentials = credentials
            // console.log(this.imageCredentials)
        },
        async deleteImage() {
            if (this.passwordForConfirmation ==  this.imageCredentials.userPassword || this.passwordForConfirmation == this.imageCredentials.authorPassword) {
                await this.$store.dispatch("deleteImage",this.imageCredentials._id)
                this.passwordForConfirmation = ''
                this.$store.dispatch("getImages")
            } else {
                this.$store.commit("setError","Please enter a valid password")
                console.log("wrongPass")
            }
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid {
    display: column;
    columns: 3;
    gap: 2rem;

    * {
        break-inside: avoid;
    }

    .imageBox {
        // transition: all 1s ease ;
        .hover {
            opacity: 0;
            transition: all 0.4s ease;
        }

        &:hover {
            .hover {
                opacity: 1;
            }
        }
        // border: 2px solid black;
        img {
            width: 100%;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }
    }
}

.hover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.452);
}

@media screen and (max-width: 769px) {
    .grid {
        display: column;
        columns: 2;
    }
}

@media screen and (max-width: 426px) {
    .grid {
        display: column;
        columns: 1;
    }
}
</style>
