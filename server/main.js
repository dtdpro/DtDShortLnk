/*
DtD Short Lnk
(c)2017-2018 DTD Prductions
Based upon https://github.com/andrewjmead/short-lnk-meteor-course by Andrew J. Mead
 */

import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import {HTTP} from 'meteor/http';

import qr from 'qr-image'

import '../imports/api/users';
import {Links} from '../imports/api/links';
import {Tracking} from '../imports/api/tracking';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {
        const url = req.url.split("/");
        const _id = url.pop();
        const link = Links.findOne({_id});

        if ((url[1] == "qr" || url[1] == "qr-png" || url[1] == "qr-svg" || url[1] == "qr-eps") && link) {
            var shortUrl = "";
            if (link.domain) {
                shortUrl = "https://" + link.domain + "/" + _id;
            } else {
                shortUrl = Meteor.absoluteUrl(_id);
            }
            try {
                if (url[1] == "qr-png") {
                    var img = qr.image(shortUrl, {margin: 1, size: 10});
                    res.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Disposition': 'attachment;filename="' + _id + '.png"',
                        'Cache-Control': 'max-age=0',
                        'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
                    });
                }

                if (url[1] == "qr") {
                    var img = qr.image(shortUrl, {margin: 1, size: 4});
                    res.writeHead(200, {'Content-Type': 'image/png'});
                }

                if (url[1] == "qr-svg") {
                    var img = qr.image(shortUrl, {type: 'svg', margin: 1});
                    res.writeHead(200, {
                        'Content-Type': 'image/svg+xml',
                        'Content-Disposition': 'attachment;filename="' + _id + '.svg"',
                        'Cache-Control': 'max-age=0',
                        'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
                    });
                }

                if (url[1] == "qr-eps") {
                    var img = qr.image("https://" + link.domain + "/" + _id, {type: 'eps', margin: 1});
                    res.writeHead(200, {
                        'Content-Type': 'application/postscript',
                        'Content-Disposition': 'attachment;filename="' + _id + '.eps"',
                        'Cache-Control': 'max-age=0',
                        'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
                    });
                }

                img.pipe(res);
                res.end;
            } catch (e) {
                res.writeHead(414, {'Content-Type': 'text/html'});
                res.end('<h1>414 Request-URI Too Large</h1>');
            }
        } else if (link && url[1] != 'tracking') {
            if (!link.pageTitle) {
                Meteor.call('getTitle', _id);
            }
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id, req.headers['x-forwarded-for'], req.headers['user-agent']);
            Meteor.call("tracking.insert", link, req.headers['x-forwarded-for'], req.headers['user-agent']);
        } else {
            next();
        }
    });
});

Meteor.methods({
    getTitle: function (_id) {
        const link = Links.findOne({_id});
        if (link) {
            HTTP.call('GET', link.url, {npmRequestOptions: {gzip: true}}, function (error, result) {
                if (!error) {
                    //console.log( response );
                    var content = result.content;
                    var start = content.toLowerCase().indexOf('<title>');
                    var end = content.toLowerCase().indexOf('</title>');
                    var page_title = content.substring(start + '<title>'.length, end);
                    console.log(page_title);
                    Meteor.call('links.setTitle', _id, page_title);
                }
            });
        }
    }
});
