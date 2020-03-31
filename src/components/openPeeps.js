const { html, $$ } = require('@forgjs/noframework');

const ACCESSORY = {
  EYE_PATCH: 'accessories-Eyepatch.svg',
  GLASSES_1: 'accessories-Glasses -1.svg',
  GLASSES_2: 'accessories-Glasses 2.svg',
  GLASSES_3: 'accessories-Glasses 3.svg',
  GLASSES_4: 'accessories-Glasses 4.svg',
  GLASSES_5: 'accessories-Glasses 5.svg',
  GLASSES_6: 'accessories-Glasses.svg',
  SUN_GLASSES: 'accessories-Sunglasses.svg',
  SUN_GLASSES_2: 'accessories-Sunglasses 2.svg',
};

const FACE = {
  ANGRY_WITH_FANG: 'face-Angry with Fang.svg',
  AWE: 'face-Awe.svg',
  BLANK: 'face-Blank.svg',
  CALM: 'face-Calm.svg',
  CHEEKY: 'face-Cheeky.svg',
  CONCERNED_FEAR: 'face-Concerned Fear.svg',
  CONCERNED: 'face-Concerned.svg',
  CONTEMPT: 'face-Contempt.svg',
  CUTE: 'face-Cute.svg',
  CYCLOPS: 'face-Cyclops.svg',
  DRIVEN: 'face-Driven.svg',
  EATING_HAPPY: 'face-Eating Happy.svg',
  EXPLAINING: 'face-explaining.svg',
  EYES_CLOSED: 'face-Eyes Closed.svg',
  FEAR: 'face-Fear.svg',
  HECTIC: 'face-Hectic.svg',
  LOVING_GRIN_1: 'face-Loving Grin 1.svg',
  LOVING_GRIN_2: 'face-Loving Grin 2.svg',
  MONSTER: 'face-Monster.svg',
  OLD: 'face-Old.svg',
  RAGE: 'face-Rage.svg',
  SERIOUS: 'face-Serious.svg',
  BIG_SMILE: 'face-Smile Big.svg',
  LOL_SMILE: 'face-Smile LOL.svg',
  TEETH_GAP_SMILE: 'face-Smile Teeth Gap.svg',
  SMILE: 'face-Smile.svg',
  SOLEMN: 'face-Solemn.svg',
  SUSPICIOUS: 'face-Suspicious.svg',
  TIRED: 'face-Tired.svg',
  VERY_ANGRY: 'face-Very Angry.svg',
  WITH_MASK_CALM: 'face-With_Mask-Calm.svg',
  WITH_MASK_CHEERS: 'face-With_Mask-Cheers.svg',
  WITH_MASK_SMILE: 'face-With_Mask-Smile.svg',
};

const HEAD = {
  AFRO: 'head-Afro.svg',
  BANGS: 'head-Bangs.svg',
  BANGS_2: 'head-Bangs 2.svg',
  BANTU_KNOTS: 'head-Bantu Knots.svg',
  BEAR: 'head-Bear.svg',
  BUN_1: 'head-Bun.svg',
  BUN_2: 'head-Bun-1.svg',
  BUN_3: 'head-Bun 2.svg',
  BUNS: 'head-Buns.svg',
  CORNROWS_1: 'head-Cornrows.svg',
  CORNROWS_2: 'head-Cornrows 2.svg',
  DREADS_1: 'head-Dreads 1.svg',
  DREADS_2: 'head-Dreads 2.svg',
  FLAT_TOP_LONG: 'head-Flat Top Long.svg',
  FLAT_TOP: 'head-Flat Top.svg',
  GREY_BUN: 'head-Gray Bun.svg',
  GREY_MEDIUM: 'head-Grey Medium.svg',
  GREY_SHORT: 'head-Grey Short.svg',
  HAT_BEANIE: 'head-hat-beanie.svg',
  HAT_HIP: 'head-hat-hip.svg',
  HIJAB: 'head-Hijab.svg',
  LONG_AFRO: 'head-Long Afro.svg',
  LONG_BANGS: 'head-Long Bangs.svg',
  LONG_CURLY: 'head-Long Curly.svg',
  LONG: 'head-Long.svg',
  MEDIUM_1: 'head-Medium 1.svg',
  MEDIUM_2: 'head-Medium 2.svg',
  MEDIUM_3: 'head-Medium 3.svg',
  BANGS_MEDIUM_1: 'head-Medium Bangs.svg',
  BANGS_MEDIUM_2: 'head-Medium Bangs 2.svg',
  BANGS_MEDIUM_3: 'head-Medium Bangs 3.svg',
  STRAIGHT_MEDIUM: 'head-Medium Straight.svg',
  MOHAWK_1: 'head-Mohawk.svg',
  MOHAWK_2: 'head-Mohawk 2.svg',
  NO_HAIR_1: 'head-No Hair 1.svg',
  NO_HAIR_2: 'head-No Hair 2.svg',
  NO_HAIR_3: 'head-No Hair 3.svg',
  POMP: 'head-Pomp.svg',
  SHAVED_1: 'head-Shaved 1.svg',
  SHAVED_2: 'head-Shaved 2.svg',
  SHAVED_3: 'head-Shaved 3.svg',
  SHORT_1: 'head-Short 1.svg',
  SHORT_2: 'head-Short 2.svg',
  SHORT_3: 'head-Short 3.svg',
  SHORT_4: 'head-Short 4.svg',
  SHORT_5: 'head-Short 5.svg',
  TURBAN: 'head-Turban.svg',
  TWISTS_1: 'head-Twists.svg',
  TWISTS_2: 'head-Twists 2.svg',
};

const FACIAL_HAIR = {
  CHIN: 'facial-hair-Chin.svg',
  FULL_1: 'facial-hair-Full.svg',
  FULL_2: 'facial-hair-Full 2.svg',
  FULL_3: 'facial-hair-Full 3.svg',
  FULL_4: 'facial-hair-Full 4.svg',
  GOATEE_1: 'facial-hair-Goatee 1.svg',
  GOATEE_2: 'facial-hair-Goatee 2.svg',
  MUSTACHE_1: 'facial-hair-Moustache 1.svg',
  MUSTACHE_2: 'facial-hair-Moustache 2.svg',
  MUSTACHE_3: 'facial-hair-Moustache 3.svg',
  MUSTACHE_4: 'facial-hair-Moustache 4.svg',
  MUSTACHE_5: 'facial-hair-Moustache 5.svg',
  MUSTACHE_6: 'facial-hair-Moustache 6.svg',
  MUSTACHE_7: 'facial-hair-Moustache 7.svg',
  MUSTACHE_8: 'facial-hair-Moustache 8.svg',
  MUSTACHE_9: 'facial-hair-Moustache 9.svg',
};

const OpenPeeps = ({
  face = FACE.LOVING_GRIN_1,
  head = HEAD.POMP,
  facialHair = FACIAL_HAIR.CHIN,
  accessory = ACCESSORY.GLASSES_1,
}) => {
  const DomElement = html`<div class="open-peeps"></div>`;

  const init = async () => {
    const faceSVG = await (await fetch(`/assets/OpenPeeps/face/${face}`)).text();
    const headSVG = await (await fetch(`/assets/OpenPeeps/head/${head}`)).text();
    const facialHairSVG = await (await fetch(`/assets/OpenPeeps/facialHair/${facialHair}`)).text();
    const accessorySVG = await (await fetch(`/assets/OpenPeeps/accessory/${accessory}`)).text();

    const faceElement = html`${faceSVG}`;

    const headElement = html`${headSVG}`;

    const facialHairElement = html`${facialHairSVG}`;

    const accessoryElement = html`${accessorySVG}`;

    const svgElement = html`
      <svg width="${850}" height="${850}" viewBox="0 0 ${850} ${850}" xmlns="http://www.w3.org/2000/svg">
        <g id="head">${Array.from(headElement.childNodes)}</g>
        <g id="face" transform="translate(160, 183)">${$$('path', faceElement)}</g>
        <g id="facial-hair" transform="translate(122, 340)">${$$('path', facialHairElement)}</g>
        <g id="accessory" transform="translate(50, 250)">${$$('path', accessoryElement)}</g>
      </svg>
    `;

    DomElement.appendChild(svgElement);
  };

  init();

  return DomElement;
};

module.exports = {
  OpenPeeps,
  FACE,
  FACIAL_HAIR,
  ACCESSORY,
  HEAD,
};
