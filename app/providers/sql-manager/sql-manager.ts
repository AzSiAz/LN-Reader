import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

/*
  Generated class for the SqlManager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqlManager {
  
  static storage: Storage
  
    static init() {
      return new Promise(resolve => {
          SqlManager.storage = new Storage(SqlStorage);
          return SqlManager.storage.get('db').then(version => {
              SqlManager.storage.set('db', 'v1');
              SqlManager.storage.set('lang', 'english');
              SqlManager.FirstInit();
              resolve();
              // if (version == undefined) {
              // }
              // else {
              //     SqlManager.updateDB();
              //     return;
              // }
          })
        })
    }
  
  static FirstInit() {
    SqlManager.storage.query(`CREATE TABLE IF NOT EXISTS "novel_list" (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
      "title"	TEXT,
      "page"	TEXT,
      "lastreviseddate"	TEXT,
      "lastrevisedid"	TEXT,
      "pageid"	INTEGER
    );`);
    SqlManager.storage.query(`CREATE TABLE IF NOT EXISTS "favorite" (
      "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
      "name"	TEXT,
      "page"	TEXT,
      "cover"	TEXT,
      "lastreviseddate"	TEXT,
      "lastrevisedid"	TEXT,
      "pageid"	INTEGER
    );`);
  }
  
  static updateDB() {
    alert("Updating DB");
  }
  
  static setLang(lang) {
    SqlManager.storage.set('lang', lang);
  }
  
  static getLang() {
    return SqlManager.storage.get('lang').then(lang => {
      return (lang != undefined) ? lang : "english";
    })
  }
  
  static setCacheNovelList(json, refresh = false) {
    SqlManager.storage.set('novel_list', json.titles.length);
    if (refresh == false) {
      for (let item of json.titles) {
        SqlManager.storage.query(`INSERT INTO "novel_list" (page, title, lastreviseddate, lastrevisedid, pageid) 
          values (?, ?, ?, ?, ?)`, [item.page, item.title, item.lastreviseddate, item.lastrevisedid, item.pageid])
      }
    }
    else {
      SqlManager.storage.query('DELETE FROM "novel_list"').then(res => {
        SqlManager.storage.query('UPDATE sqlite_sequence SET seq=0 WHERE name="novel_list"').then(res => {
          for (let item of json.titles) {
            SqlManager.storage.query(`INSERT INTO novel_list (page, title, lastreviseddate, lastrevisedid, pageid) 
              values (?, ?, ?, ?, ?)`, [item.page, item.title, item.lastreviseddate, item.lastrevisedid, item.pageid])
          }
        }, e => {
          console.error(e);
        })
      })
    }
  }
  
  static getCacheNovelList(refresh = false) {
    if (refresh == false) {
      return SqlManager.storage.query('SELECT * FROM "novel_list"').then((data) => {
          if(data.res.rows.length > 0) {
            let list = [];
            for(var i = 0; i < data.res.rows.length; i++) {
                list.push({page: data.res.rows.item(i).page, title: data.res.rows.item(i).title,
                  lastreviseddate: data.res.rows.item(i).lastreviseddate, lastrevisedid: data.res.rows.item(i).lastrevisedid, 
                  pageid: data.res.rows.item(i).pageid});
            }
            return list;
          }
          return SqlManager.getLang();
      }, (error) => {
          console.log("ERROR -> " + JSON.stringify(error.err));
      });
    }
    else {
      return SqlManager.getLang();
    }
  }

  static getCacheNovel(name) {
    return SqlManager.storage.get('cache_' + name).then(data => {
      try {
        data = JSON.parse(data);
        if (data.code) throw Error;
        return data;
      }
      catch (e) {
        return false;
      }
    })
  }

  static setCacheNovel(json) {
    SqlManager.storage.set('cache_' + json.title.replace(/ /g, "_"), JSON.stringify(json));
  }
  
  static setFavNovel() {
    
  }
  
  static getFavNovel() {
    
  }
}

