import { isString } from 'underscore';
import PropertyView from './PropertyView';

export default class PropertyFileView extends PropertyView {
  events() {
    return {
      ...PropertyView.prototype.events,
      'click [data-clear-asset]': 'clear',
      'click [data-open-assets]': 'openAssetManager',
    };
  }

  templateInput() {
    const { pfx, em } = this;
    const icons = this.em?.getConfig('icons');
    const iconClose = icons?.close;

    return `
      <div class="${pfx}field ${pfx}file">
        <div id="${pfx}preview-box" class="${pfx}preview-file" data-preview-box>
          <div id="${pfx}preview-file" class="${pfx}preview-file-cnt" data-preview></div>
        </div>
        <div id='${pfx}input-holder'>
          <div class="${pfx}btn-c">
            <button class="${pfx}btn" id="${pfx}images" type="button" data-open-assets>
              Add Image
            </button>
          </div>
          <div class="${pfx}btn-c">
            <button class="${pfx}btn" id="${pfx}edit" type="button">
              <i class="far fa-edit"></i> Edit
            </button>
          </div>
          <div class="${pfx}btn-c">
            <button class="${pfx}btn" id="${pfx}images" type="button" data-open-assets>
              Upload
            </button>
          </div>
          <div class="${pfx}btn-c">
            <button class="${pfx}btn" id="${pfx}close" type="button" data-clear-asset>
              <i class="far fa-times-circle"></i> Delete
            </button>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    `;
  }

  __setValueInput(value) {
    const { model, el, pfx } = this;
    const valueDef = model.getDefaultValue();
    const prvBoxEl = el.querySelector('[data-preview-box]');
    const prvEl = el.querySelector('[data-preview]');
    const noImage = !value || value === valueDef;
    const buttons = el.querySelectorAll(`.${pfx}btn-c`).forEach((btn, i) => {
      if (i === 0) {
        btn.style.display = noImage ? '' : 'none';
      } else {
        btn.style.display = noImage ? 'none' : '';
      }
    });
    prvBoxEl.style.display = noImage ? 'none' : '';
    prvEl.style.backgroundImage = value || model.getDefaultValue();
  }

  openAssetManager() {
    const am = this.em?.get('AssetManager');

    am?.open({
      select: (asset, complete) => {
        const url = isString(asset) ? asset : asset.get('src');
        this.model.upValue(url, { partial: !complete });
        complete && am.close();
      },
      types: ['image'],
      accept: 'image/*',
    });
  }
}
