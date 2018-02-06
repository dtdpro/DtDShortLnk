import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import {HTTP} from 'meteor/http';

import qr from 'qr-image'

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const url = req.url.split("/");
    const _id = url.pop();
    const link = Links.findOne({ _id });
    const shortUrl = Meteor.absoluteUrl(_id);

    console.log(req.url.split("/"));
    console.log(_id);

    if (url[1] == "qr" || url[1] == "qr-png") {
      if (link) {
        try {
            if (url[1] == "qr-png") {
              var img = qr.image(shortUrl,{margin:1,size:10});
              res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment;filename="'+_id+'.png"',
                'Cache-Control': 'max-age=0',
                'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
              });
            } else {
              var img = qr.image(shortUrl,{margin:1,size:4});
              res.writeHead(200, {'Content-Type': 'image/png'});
            }
            img.pipe(res);
            res.end
        } catch (e) {
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('<h1>414 Request-URI Too Large</h1>');
        }
      }
    } else if (url[1] == "qr-svg") {
      if (link) {
        try {
            var img = qr.image(shortUrl,{type:'svg',margin:1});
            res.writeHead(200, {
              'Content-Type': 'image/svg+xml',
              'Content-Disposition': 'attachment;filename="'+_id+'.svg"',
              'Cache-Control': 'max-age=0',
              'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
            });
            img.pipe(res);
            res.end
        } catch (e) {
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('<h1>414 Request-URI Too Large</h1>');
        }
      }
    } else if (url[1] == "qr-eps") {
      if (link) {
        try {
            var img = qr.image(shortUrl,{type:'eps',margin:1});
            res.writeHead(200, {
              'Content-Type': 'application/postscript',
              'Content-Disposition': 'attachment;filename="'+_id+'.eps"',
              'Cache-Control': 'max-age=0',
              'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',
            });
            img.pipe(res);
            res.end
        } catch (e) {
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('<h1>414 Request-URI Too Large</h1>');
        }
      }
    } else if (link) {
      if (!link.pageTitle) {
        Meteor.call('getTitle',_id);
      }
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});

Meteor.methods({
  getTitle: function(_id) {
    const link = Links.findOne({ _id });
    if (link) {
      HTTP.call( 'GET', link.url, {npmRequestOptions: {gzip:true}}, function( error, result ) {
          if ( !error ) {
            //console.log( response );
            var content =  result.content;
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
