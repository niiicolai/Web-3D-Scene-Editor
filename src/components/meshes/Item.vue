<template>
    <div class="meshes__item">
        <div class="meshes__item__header">
            <p>{{ mesh.data.name }}</p>
        </div>
        <img :src="mesh.data.thumbnail" :alt="mesh.data.name" class="meshes__item__thumbnail" />
        <div class="meshes__submeshes__item__list">
            <h5>Submeshes</h5>
            <div class="meshes__submeshes__item" v-for="subMesh in mesh.data.sub_meshes" :key="subMesh.name">
                <p>{{ subMesh.name }}</p>
                <small>Material: {{ subMesh.material }}</small>
            </div>
        </div>

        <slot name="actions" :mesh="mesh"></slot>
        
    </div>
</template>

<script setup>
defineProps({
    mesh: {
        type: Object,
        default: () => {}
    }
});
</script>

<style scoped>
.meshes__item {
    display: block;
    margin-bottom: 1em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1em;
}

.meshes__item__thumbnail {
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
}

.meshes__item__header {
    display: block;
    margin-bottom: 0.5em;
    text-align: center;
}

.meshes__item p {
    margin-bottom: 0em;
    font-weight: bold;
}

.meshes__item small {
    display: block;
}

.meshes__item h5 {
    margin-top: 0em;
    margin-bottom: 0.5em;
    text-transform: uppercase;
}

.meshes__submeshes__item p {
    margin-bottom: 0em;
    margin-top: 0em;
    font-weight: bold;
}

.meshes__submeshes__item small {
    display: block;
}

</style>