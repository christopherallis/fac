<script setup>
import { ref, defineProps } from 'vue'

import { useRouter } from 'vue-router'

const navOpen = ref(false);
const router = useRouter();

const props = defineProps(["title"])

</script>

<template>
    <div class="content">
        <nav>
            <div class="overlay">
                <div class="nav-top">
                    <div>{{ props.title }}</div>
                </div>
                <span id="menu-toggle" @click="navOpen = !navOpen" class="material-icons">menu</span>
            </div>
            <div class="links" :class="(navOpen)?'open':''" @click="navOpen = false">
                <slot></slot>
            </div>
        </nav>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<style>
    .overlay {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 40px;
        padding: 10px;
        background-color: var(--surface-color);
    }
    nav {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    }
    nav .links {
        display: none;
        flex-direction: column;
        position: absolute;
        background-color: var(--surface-color);
        width: 100%;
        height: calc( 100% - 44px );
    }
    nav .links.open{
        display: flex;
    }
    .nav-top div {
        font-size: 20px;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    #menu-toggle {
        cursor: pointer;
        user-select: none;
    }

    .content {
        display: flex;
        height: 100vh;
        flex-direction: column;
    }

    main {
        height: 100%;
    }

    @media only screen and (min-width: 800px) {
        .content {
            width: 100vw;
            flex-direction: row;
        }
        main {
            flex-grow: 1;
        }
        #menu-toggle {
            display: none;
        }
        nav {
            height: 100%;
            width: 200px;
            display: flex;
            flex-direction: column;
        }
        nav .links {
            display: flex;
            position: relative;
            flex-grow: 1;
        }
    }
    
</style>