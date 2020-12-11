import Vue from "vue";
import i18n from "./src/i18n/i18n";
import store from "./src/store/store";

window.baseActions = [
    {
        title: "Details",
        icon: "fa fa-eye",
        color: "#187DE4",
        hide: true,
        click: (data, ftable, parent) => {
            window.details(ftable.route, data);
        }
    },
    {
        title: "Edit",
        icon: "fa fa-edit",
        color: "#15b529",
        click: (data, ftable, parent) => {
            window.edit(ftable.route, data);
        }
    },
    {
        title: "Delete",
        icon: "fa fa-trash",
        color: "#d02626",
        click: (data, ftable, parent) => {
            window.remove(data, ftable.table, parent);
        }
    }
];

var myMixin = {
    methods: {
        goTo: function(route) {
            window.router.push(route);
        },

        checkAllClicked: function(ftable) {
            if (ftable.checkAll == 0) {
                ftable.items.forEach(item => {
                    ftable.checkAll = 1;
                    if (!ftable.checkSelected.includes(item.id)) {
                        ftable.checkSelected.push(item.id);
                    }
                });
            } else {
                ftable.checkAll = 0;
                ftable.checkSelected = [];
            }
        },

        checkClicked(ftable, id) {
            if (!ftable.checkSelected.includes(id)) {
                ftable.checkSelected.push(id);
            } else {
                let checkIndex = null;
                _.filter(ftable.checkSelected, function(data, i) {
                    if (data == id) {
                        checkIndex = i;
                    }
                });
                ftable.checkSelected.splice(checkIndex, 1);
            }
        },

        details(route, data) {
            this.goTo(`/${route}/details/${data.id}`);
        },

        edit(route, data) {
            this.goTo(`/${route}/edit/${data.id}`);
        },

        remove(data, table, parent) {
            let name = data.name || "";
            let me = this;
            Swal.fire({
                title: i18n.t("Delete") + " " + name,
                text: i18n.t("Are you sure?"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: i18n.t("Yes, delete !"),
                cancelButtonText: i18n.t("Cancel"),
                confirmButtonColor: "#d02626",
                cancelButtonColor: "rgb(21 181 41)"
            }).then(function(result) {
                if (result.value) {
                    me.removeRow(table, data.id, parent);
                }
            });
        },
        removed(parent) {
            Swal.fire({
                title: i18n.t("Deleted!"),
                text: i18n.t("Deleted successfully."),
                icon: "success",
                confirmButtonText: i18n.t("Ok")
            });
            parent.refresh(1);
        },

        removeRow(table, id, parent) {
            let me = this;
            const requestSend = {
                resource: table,
                ids: id
            };
            store
                .dispatch(`${table}/removeArray`, requestSend)
                .then(res => {
                    me.removed(parent);
                })
                .catch(err => {});
        },

        getLanguage() {
            return localStorage.getItem("lang") || "en";
        },

        getValidations(errors) {
            let validations = "";
            for (let key in errors.response.data.errors) {
                validations += errors.response.data.errors[key] + "<br>";
            }
            if (errors.response.status == 404) {
                return i18n.t("Response Not found");
            } else if (errors.response.status !== 402) {
                return validations;
            }
        }
    }
};

var ourMixin = Vue.extend({
    mixins: [myMixin] 
});

var mymixin = new ourMixin();
window.goTo = route => {
    mymixin.goTo(route);
};
window.checkAllClicked = ftable => {
    mymixin.checkAllClicked(ftable);
};
window.checkClicked = (ftable, id) => {
    mymixin.checkClicked(ftable, id);
};
window.details = (route, data) => {
    mymixin.details(route, data);
};
window.edit = (route, data) => {
    mymixin.edit(route, data);
};
window.remove = (data, table, parent) => {
    mymixin.remove(data, table, parent);
};
window.getLanguage = () => {
    return mymixin.getLanguage();
};
window.getValidations = errors => {
    return mymixin.getValidations(errors);
};
