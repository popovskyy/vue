import { defineStore } from 'pinia';
import { auth, usersCollection } from '@/includes/firebase.js';

export default defineStore('user', {
    state: () => ({
        userLoggedIn: false,
        userDisplayName: false
    }),
    actions: {
        async register(values) {
            const userCred = await auth.createUserWithEmailAndPassword(
                values.email, values.password
            );

            await usersCollection.doc(userCred.user.uid).set({
                name: values.name,
                email: values.email,
                age: values.age,
                country: values.country,
                type_music: values.type_music
            });

            await userCred.user.updateProfile({
                displayName: values.name
            });

            this.userLoggedIn = true;
        },

        async authenticate(values) {
            await auth.signInWithEmailAndPassword(values.email, values.password);

            this.userLoggedIn = true;
        },

        async updateInfo(values) {
            const currentUser = await auth.currentUser;
            await currentUser.updateProfile({
                displayName: values.name
            });

            this.userDisplayName = values.name;
        },

        async signOut() {
            await auth.signOut();

            this.userLoggedIn = false;
            this.userDisplayName = false;
        }
    }
});