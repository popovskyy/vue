<template>
    <div class="container mx-auto">
        <div class="main-header-content p2">
            <h1 class="text-center font-bold text-5xl pt-10 pb-10">My Account</h1>
            <p class="w-full md:w-8/12 mx-auto text-center">
                Here you can update some information about yourself
            </p>
            <vee-form ref="form" :validation-schema="schema" @submit="submitForm" :initial-values="userData">
                <!-- Name -->
                <div class="mb-3">
                    <label class="inline-block mb-2">Name</label>
                    <vee-field
                        type="text"
                        name="name"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Name"
                    />
                    <ErrorMessage class="text-red-600" name="name" />
                </div>
                <button
                    type="submit"
                    class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
                    Submit
                </button>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { auth } from '@/includes/firebase';
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
    name: 'MyAccount',
    data() {
        return {
            userData: {
                name: ''
            },
            schema: {
                name: 'required|min:3|max:100|alpha_spaces'
            }
        };
    },
    async created() {
        await this.loadUserData();
    },
    methods: {
        ...mapActions(useUserStore, {
            updateInfo: 'updateInfo'
        }),
        async loadUserData() {
            const { displayName, photoURL } = await auth.currentUser;
            this.userData.name = displayName;
            this.userData.image = photoURL;
            this.currentUser = auth.currentUser;

            const form = this.$refs.form;
            if (form) {
                form.setValues(this.userData);
            }
        },
        async submitForm(values) {
            await this.updateInfo(values)
        }
    }
};
</script>


<style scoped>
input[type='file'] {
    margin: 0;
}
</style>