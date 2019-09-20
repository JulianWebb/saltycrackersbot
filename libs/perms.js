// perms.js

module.exports = class Perms {
    constructor(permArray) {
        this.perms = this.genPerms(permArray);
    }

    genPerms(arr) {
        let perms = {};

        for (let p in arr) {
            perms[arr[p].name] = arr[p].role;
            for (let i = 0; i < p; i++) {
                perms[arr[p].name] = perms[arr[p].name].concat(arr[i].role)
            }
        }
        return perms;
    }

    check(roles, permLevel) { 
        if (permLevel == "everyone") return true;

        return roles.some((role) => {
            return this.perms[permLevel].includes(role.id);
        });
    }
}