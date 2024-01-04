<template>
    <Header />

    <router-view></router-view>
    <player></player>
    <Auth />
</template>
<script>
import Header from '@/components/Header.vue';
import Auth from '@/components/Auth.vue';
import Player from '@/components/Player.vue';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';
import { auth } from '@/includes/firebase';

export default {
    name: 'App',
    components: {
        Header,
        Auth,
        Player
    },
    computed: {
        ...mapWritableState(useUserStore, ['userLoggedIn', 'userDisplayName'])
    },
    created() {
        if (auth.currentUser) {
            this.userLoggedIn = true;
            this.userDisplayName = auth.currentUser.displayName;
        }
    }
};
</script>
