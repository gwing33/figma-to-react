import * as Figma from 'figma-js';
import { findComponent } from './findComponent';
import { createComponent } from './createComponent';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import config from './config';

const client = Figma.Client({
  personalAccessToken: config.personalAccessToken,
});

// This is mostly just for testing.
from(client.file(config.fileId))
  .pipe(map((resp) => resp.data))
  .subscribe((file) => {
    const ids = Object.keys(file.components);
    const components = ids.map((id) => createComponent(findComponent(file.document, id)));
    console.log(components);
  });
