<template>
    <div class="form p-3">
        <div v-if="errors.length > 0" class="mb-3 border border-black rounded p-3 bg-red-200">
            <ul v-for="error in errors" :key="error" class="text-red-500 list-disc pl-4 break-words">
                <li>{{ error }}</li>
            </ul>
        </div>

        <slot />
    </div>
</template>

<script setup>
defineProps({
    errors: {
        type: Array,
        required: true
    }
});
</script>

<style >
.form label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.form input[type="file"] {
    border: 1px solid #000;
    padding: 0.5rem;
    border-radius: 10px;
    width: 100%;
}

.form input[type="text"] {
    border: 1px solid #000;
    border-radius: 10px;
    width: 100%;
    padding: 0.2em;
}

.form select {
    border: 1px solid #000;
    border-radius: 10px;
    width: 100%;
    padding: 0.2em;
}

.form .input-control {
    margin-bottom: 0.5em;
}

.form button[type="submit"] {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 0.5em 1em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    width: 100%;
    border-radius: 10px;
}

.form button[type="submit"]:hover {
    background-color: #45a049;
}

</style>