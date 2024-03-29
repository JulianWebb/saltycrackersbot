const Database = require('better-sqlite3');
const fs = require('fs');

module.exports = class DBHandler {
    constructor(dbFile, verbose = null) {
        this.database = new Database(dbFile, { verbose: verbose })
        
        // Check if info table exists, if not, make it so
        if (!this.tableExists('user_info')) this.generateInfoTable();
    }

    tableExists(tableName) {
        let statement = this.database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").bind(tableName);
        let result = statement.get();
        
        return typeof result == "undefined"? false: true;
    }

    generateInfoTable() {
        let statement = this.database.prepare('CREATE TABLE "user_info" ("user_id"	TEXT NOT NULL UNIQUE, "user_tag"	TEXT NOT NULL UNIQUE, "joined_time"	TEXT NOT NULL, "on_server"	INTEGER NOT NULL DEFAULT 1, "message_count"	TEXT NOT NULL DEFAULT 0, "last_message"	TEXT, "can_politick"	INTEGER NOT NULL DEFAULT 0, PRIMARY KEY("user_id"));');
        return statement.run();
    }

    addUser(user) {
        let statement = this.database.prepare('INSERT INTO "user_info" (user_id, user_tag, joined_time) VALUES (@userID, @userTag, @joinedTime)')
        return statement.run({
            userID : user.id,
            userTag : user.tag,
            joinedTime: user.joined
        });
    }

    updateUser(user) {
        let statement = this.database.prepare('UPDATE "user_info" SET user_tag = @userTag, joined_time = @joinedTime, on_server = 1 WHERE user_id = @userID');
        return statement.run({
            userID: user.id,
            userTag: user.tag,
            joinedTime: user.joined
        });
    }

    userExists(userID) {
        let statement = this.database.prepare('SELECT * FROM "user_info" WHERE user_id = ?').bind(userID);
        let result = statement.get();

        return typeof result == "undefined"? false: true;
    }

    userJoined(user) {
        if (!this.userExists(user.id)) {
            client.log(`Adding ${user.tag} to database`);
            this.addUser({
                id: user.id,
                tag:  user.tag,
                joined: user.joined
            });
        } else {
            client.log(`${user.tag} already in database, updating record`);
            this.updateUser({
                id: user.id,
                tag: user.tag,
                joined: user.joined
            });
        }
    }

    userLeftServer(userID) {
        let statement = this.database.prepare('UPDATE "user_info" SET on_server = 0 WHERE user_id = ?').bind(userID);
        return statement.run();
    }

    updateLastMessage(userID, messageTime) {
        let statement = this.database.prepare('UPDATE "user_info" SET last_message = @last WHERE user_id = @user');
        return statement.run({user: userID, last: messageTime});
    }

    getLastMessage(userID) {
        let statement = this.database.prepare('SELECT last_message FROM user_info WHERE user_id = ?').bind(userID);
        let result = statement.get();

        return typeof result == 'undefined' ? '1970-01-01T00:00:00.00Z' : result['last_message'];
    }

    incrementMessageCount(userID) {
        let statement = this.database.prepare('UPDATE user_info SET message_count = message_count + 1 WHERE user_id = ?').bind(userID);
        return statement.run();
    }

    canPolitick(userID) {
        let statement = this.database.prepare('UPDATE user_info SET can_politick = 1 WHERE user_id = ?').bind(userID);
        return statement.run();
    }
}

