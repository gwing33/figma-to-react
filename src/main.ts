import * as Figma from 'figma-js';
import { findComponent } from './findComponent';
import { createComponent } from './createComponent';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import config from './config';
import * as fs from 'fs';

const client = Figma.Client({
  personalAccessToken: config.personalAccessToken,
});

// This is mostly just for testing.
from(client.file(config.fileId))
  .pipe(map((resp) => resp.data))
  .subscribe((file) => {
    const ids = Object.keys(file.components);
    const components = ids.map((id) => createComponent(findComponent(file.document, id)));

    const outDir = __dirname + '/../out';
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    components.forEach(([name, c]) => {
      console.log(name, c);
      fs.writeFile(`${outDir}/${name}.tsx`, c, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log(`${name} was written`);
      });
    });
  });
