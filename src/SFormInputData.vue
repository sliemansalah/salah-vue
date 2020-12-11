<template>
    <b-row>
        <b-col
            v-for="(input, index) in jsonInputs"
            :key="index"
            :md="input.col ? input.col : input.type == 'image' ? 12 : 3"
        >
            <div v-if="input.type == 'image'">
                <div class="block-image">
                    <div class="avatar">
                        <img
                            :class="
                                inputs['imageSelected']
                                    ? 'fix-remove-image'
                                    : ''
                            "
                            @click="imageChange"
                            :width="
                                windowWidth > 1000
                                    ? '22.5%'
                                    : windowWidth > 800
                                    ? '60%'
                                    : '100%'
                            "
                            height="200px"
                            id="our-custom-image"
                            :src="
                                inputs['imageSelected']
                                    ? inputs['imageSelected']
                                    : inputs['defaultImage']
                            "
                        />
                        <i
                            @click="inputs['imageSelected'] = null;"
                            v-if="inputs['imageSelected']"
                            class="fa fa-close remove-image"
                        ></i>

                        <input
                            ref="our-custom-input"
                            id="our-custom-input"
                            @change="imageChange"
                            :accept="input.accept"
                            size="md"
                            type="file"
                            name="our-custom-input"
                        />
                    </div>
                </div>
            </div>
            <b-form-group
                v-else-if="input.type == 'text'"
                :label="$t(input.label)"
            >
                <b-form-input
                    v-if="input.lang"
                    size="md"
                    v-model="inputs[input.key][input.lang]"
                    type="text"
                ></b-form-input>
                <b-form-input
                    v-else
                    size="md"
                    v-model="inputs[input.key]"
                    type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                v-else-if="input.type == 'number'"
                :label="$t(input.label)"
            >
                <b-form-input
                    size="md"
                    v-model="inputs[input.key]"
                    type="number"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                v-else-if="input.type == 'select'"
                :label="$t(input.label)"
            >
                <b-form-select
                    size="md"
                    v-model="inputs[input.key]"
                    type="text"
                    :options="input.options"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                v-else-if="input.type == 'toggle'"
                :label="$t(input.label)"
            >
                <toggle-button
                    :sync="true"
                    v-model="inputs[input.key]"
                    :color="{
                        checked: '#6AD2A3',
                        unchecked: '#D92550'
                    }"
                >
                </toggle-button>
            </b-form-group>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: ["inputs", "selectedFile", "jsonInputs"],
    data() {
        return {
            windowWidth: 1000
        };
    },
    methods: {
        getWindowWidth() {
            this.windowWidth = document.documentElement.clientWidth;
            console.log(this.windowWidth);
        },
        imageChange(evt) {
            this.$emit("imageChange", evt);
        }
    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener("resize", this.getWindowWidth);
            this.getWindowWidth();
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.getWindowWidth);
    }
};
</script>

<style></style>
