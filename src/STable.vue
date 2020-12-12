<template>
    <b-card>
        <b-modal id="table-settings-modal" hide-footer>
            <template #modal-title>
                <h5>{{ $t("Table Settings") }}</h5>
            </template>
            <div class="d-block">
                <div
                    v-for="(field, fieldIndex) in STable.fields"
                    :key="fieldIndex"
                >
                    <p v-if="field.settingsLabel">
                        <span> {{ field.settingsLabel }}</span>
                        <input
                            @change="changeSettings(field)"
                            :checked="field.show == 'yes' ? true : false"
                            type="checkBox"
                            v-model="field.show"
                        />
                    </p>
                </div>
            </div>
        </b-modal>

        <div class="table-filters">
            <b-row>
                <b-col
                    v-for="(filter, filterKey) in STable.filterInputs[0]"
                    :key="filterKey"
                    v-if="filter.show == 'yes'"
                    sm="3"
                >
                    <b-form-input
                        v-if="filter.type == 'input'"
                        v-model="filter.value"
                        size="md"
                        :placeholder="$t(filter.label)"
                    ></b-form-input>
                    <b-form-select
                        v-else-if="filter.type == 'select'"
                        v-model="filter.value"
                        :options="filter.options"
                        size="md"
                    >
                        <template #first>
                            <b-form-select-option :value="null"
                                ><span class="disabled-label">{{
                                    $t(filter.label)
                                }}</span></b-form-select-option
                            >
                        </template>
                    </b-form-select>
                    <date-picker
                        v-else-if="filter.type == 'date'"
                        style="width: 100%"
                        v-model="filter.value"
                        :lang="getLanguage() == 'ar' ? 'ar' : 'en'"
                        :placeholder="$t(filter.label)"
                        :clearable="true"
                        format="DD/MM/YYYY"
                    />
                </b-col>
            </b-row>
            <b-row class="filter-actions">
                <b-button
                    @click="refresh(null)"
                    size="md"
                    class="gold-bg white-clr"
                >
                    <i class="fa fa-filter"></i>
                    {{ $t("Search") }}
                </b-button>
                <b-button @click="clearFilters" size="md" variant="dark">
                    <i class="fa fa-undo"></i>
                    {{ $t("Reset") }}
                </b-button>

                <b-dropdown
                    :disabled="STable.checkSelected.length == 0"
                    variant="primary"
                    id="dropdown-1"
                    :text="$t('Actions')"
                >
                    <b-dropdown-item @click="activeData">{{
                        $t("makeActive")
                    }}</b-dropdown-item>
                    <b-dropdown-item @click="unActiveData">{{
                        $t("makeUnActive")
                    }}</b-dropdown-item>
                    <b-dropdown-item @click="removeData">{{
                        $t("Delete")
                    }}</b-dropdown-item>
                </b-dropdown>

                <b-button
                    v-if="STable.settingsButtonShow"
                    @click="openSettingsModal"
                    size="md"
                    class="green-bg white-clr"
                >
                    <i class="fa fa-cog"></i>
                    {{ $t("Settings") }}
                </b-button>
            </b-row>
        </div>

        <div class="search-STable-input">
            <div class="input-group fix-mb-25">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                        ><i class="fa fa-search"></i
                    ></span>
                </div>
                <input
                    class="form-control"
                    type="text"
                    v-model="search"
                    :placeholder="$t('Search...')"
                />
            </div>
        </div>
        <b-table
            :items="STable.items"
            :fields="STable.fields"
            responsive="sm"
            :sort-icon-left="getLanguage() == 'ar' ? false : ''"
            :show-empty="STable.dataTableLoded"
            stacked="md"
            :current-page="STable.currentPage"
            :filter="STable.filter"
            :sort-by.sync="STable.sortBy"
            :sort-desc.sync="STable.sortDesc"
            @sort-changed="sortChanged"
            no-border-collapse
        >
            <template v-if="" v-for="c in STable.newColumns"
            v-slot:[`cell(${c.key})`]="row">
                <slot :row="row"></slot>
            </template>
            <!-- <template #cell(status2)="row">
                <slot :row="row"></slot>
            </template> -->

            <template #empty>
                <div class="text-center">
                    <h4 class="text-danger">{{ $t("No data here...") }}</h4>
                </div>
            </template>

            <template #head(checkboxes)>
                <input
                    class="checkAll"
                    :checked="STable.checkAll == 1 ? true : false"
                    @click="checkAllClicked"
                    type="checkBox"
                    v-model="STable.checkAll"
                />
            </template>
            <template #cell(checkboxes)="row">
                <input
                    type="checkBox"
                    @click="checkClicked(row.item.id)"
                    :checked="
                        STable.checkSelected.includes(row.item.id)
                            ? true
                            : false
                    "
                />
            </template>

            <template #cell(image)="row">
                <a :href="row.item.image" target="_blank">
                    <img
                        class="image-table"
                        :src="row.item.image"
                        alt="Image"
                    />
                </a>
            </template>

            <template #cell(created_at)="row">
                {{ row.item.created_at | formatDate }}
            </template>

            <template #cell(updated_at)="row">
                {{ row.item.updated_at | formatDate }}
            </template>

            <template #cell(status)="row">
                <div
                    @click="updateStatus(row.item.id, 1)"
                    v-if="row.item.status == 0"
                    class="circle-status red"
                    v-b-tooltip.hover.top
                    :title="$t('makeActive')"
                ></div>
                <div
                    @click="updateStatus(row.item.id, 0)"
                    v-else-if="row.item.status == 1"
                    class="circle-status green"
                    v-b-tooltip.hover.top
                    :title="$t('makeUnActive')"
                ></div>
                <span
                    class="status-action"
                    v-if="row.item.status == 0"
                    :style="statusStyle(0)"
                    >{{ $t("Not Active") }}</span
                >
                <span
                    class="status-action"
                    v-if="row.item.status == 1"
                    :style="statusStyle(1)"
                    >{{ $t("Active") }}</span
                >
            </template>
            <template #cell(actions)="row">
                <div class="action-container">
                    <span
                        @mouseover="
                            hoverIndex = index;
                            rowID = row.item.id;
                        "
                        @mouseout="
                            hoverIndex = null;
                            rowID = null;
                        "
                        v-for="(actionItem, index) in STable.actions"
                        :key="index"
                        @click="actionItem.click(row.item, STable, $parent)"
                        class="btn-action"
                        v-b-tooltip.hover.bottom
                        :title="$t(actionItem.title)"
                        v-if="!actionItem.hide"
                    >
                        <i
                            :style="
                                hoverIndex == index && rowID == row.item.id
                                    ? setActionHoverColor(actionItem.color)
                                    : null
                            "
                            :class="actionItem.icon"
                        ></i>
                    </span>
                </div>
            </template>
        </b-table>

        <div v-if="!STable.dataTableLoded" class="text-center">
            <b-spinner variant="primary"></b-spinner>
        </div>

        <b-pagination
            @change="refreshByPage($event)"
            v-model="STable.currentPage"
            :total-rows="STable.total"
            aria-controls="my-table"
            align="right"
        ></b-pagination>

        <span>
            <span>{{ $t("Items in page = ") }}</span>
            <span>{{ STable.items.length }}</span>
        </span>
        <span>
            <span>{{ $t(", Total=") }}</span>
            <span>{{ STable.total }}</span>
        </span>
    </b-card>
</template>

<script>
export default {
    watch: {
        search: function(search) {
            var self = this;
            if (self.STable.time) {
                clearTimeout(self.STable.time);
            }
            this.STable.time = setTimeout(
                () => this.searchOnline(search),
                1000
            );
        }
    },
    data() {
        return {
            hoverIndex: null,
            rowID: null,
            search: null
        };
    },
    props: ["STable"],
    methods: {
        setActionHoverColor(actionHoverColor) {
            return {
                color: `${actionHoverColor} !important`
            };
        },
        searchOnline: function(search) {
            this.STable.search = search;
            this.refresh(null);
        },
        updateStatus(id, status) {
            let req = null;
            status == 1 ? (req = "activeArray") : (req = "unActiveArray");

            const requestSend = {
                resource: this.STable.resource,
                ids: id
            };

            this.$store
                .dispatch(`${this.STable.resource}/${req}`, requestSend)
                .then(res => {
                    this.refresh();
                })
                .catch(err => {});
        },
        removeData() {
            let ids = this.STable.checkSelected.toString().replace("[", "");
            ids = ids.replace("]", "");
            console.log(ids);
            const requestSend = {
                resource: this.STable.resource,
                ids: ids
            };
            this.$store
                .dispatch(`${this.STable.resource}/removeArray`, requestSend)
                .then(res => {
                    this.refresh();
                })
                .catch(err => {});
        },
        activeData() {
            let ids = this.STable.checkSelected.toString().replace("[", "");
            ids = ids.replace("]", "");
            console.log(ids);
            const requestSend = {
                resource: this.STable.resource,
                ids: ids
            };
            this.$store
                .dispatch(`${this.STable.resource}/activeArray`, requestSend)
                .then(res => {
                    this.refresh();
                })
                .catch(err => {});
        },
        unActiveData() {
            let ids = this.STable.checkSelected.toString().replace("[", "");
            ids = ids.replace("]", "");
            console.log(ids);
            const requestSend = {
                resource: this.STable.resource,
                ids: ids
            };
            this.$store
                .dispatch(`${this.STable.resource}/unActiveArray`, requestSend)
                .then(res => {
                    this.refresh();
                })
                .catch(err => {});
        },
        changeSettings(field) {
            /* show hide columns */
            if (field.show == "yes") {
                field.show = "no";
                field.class = "d-none";
            } else {
                field.show = "yes";
                field.class = "";
            }

            /* show hide filters */

            if (this.STable.filterInputs[0]) {
                for (let key in this.STable.filterInputs[0]) {
                    if (
                        key == `from_${field.key}` ||
                        (key == `to_${field.key}` &&
                            this.STable.filterInputs[0][`from_${field.key}`]
                                .show == "yes")
                    ) {
                        this.STable.filterInputs[0][`from_${field.key}`].show =
                            "no";
                        this.STable.filterInputs[0][`to_${field.key}`].show =
                            "no";
                    } else if (
                        key == `from_${field.key}` ||
                        (key == `to_${field.key}` &&
                            this.STable.filterInputs[0][`from_${field.key}`]
                                .show !== "yes")
                    ) {
                        // this.STable.filterInputs[0][`from_${field.key}`].show = "no";
                        // this.STable.filterInputs[0][`to_${field.key}`].show = "no";
                    } else if (
                        key !== `from_${field.key}` &&
                        key !== `to_${field.key}`
                    ) {
                        if (
                            this.STable.filterInputs[0][`${field.key}`].show ==
                            "yes"
                        ) {
                            this.STable.filterInputs[0][`${field.key}`].show =
                                "no";
                            console.log(
                                this.STable.filterInputs[0][`${field.key}`]
                            );
                        } else {
                            // this.STable.filterInputs[0][`${field.key}`].show = "yes"
                        }
                    }
                }
            }
        },
        openSettingsModal() {
            this.$bvModal.show("table-settings-modal");
        },
        refreshByPage(page) {
            this.$emit("refresh", page);
        },
        refresh(page) {
            this.$emit("refresh", page);
        },
        getLanguage() {
            return window.getLanguage();
        },
        statusStyle(val) {
            if (val == 0) {
                return {
                    color: "#d02626"
                };
            } else if (val == 1) {
                return {
                    color: "#15b529"
                };
            }
        },
        checkAllClicked() {
            window.checkAllClicked(this.STable);
        },
        checkClicked(id) {
            window.checkClicked(this.STable, id);
        },
        sortChanged(data) {
            if ((this.STable.sortBy = data.sortDesc)) {
                this.STable.sortBy = data.sortBy;
                this.STable.sortDesc = true;
            } else {
                this.STable.sortBy = data.sortBy;
                this.STable.sortDesc = false;
            }
            this.refresh(null);
        },
        async clearFilters() {
            await this.emptyFilters();
            this.refresh(null);
        },
        emptyFilters() {
            this.STable.filterInputs.forEach(filtersData => {
                for (let key in filtersData) {
                    filtersData[key].value = null;
                }
            });
        }
    }
};
</script>

<style></style>
