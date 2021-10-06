import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faHorizontalRule as falFaHorizontalRule } from '@fortawesome/pro-light-svg-icons/faHorizontalRule';
import { faAlignCenter } from '@fortawesome/pro-regular-svg-icons/faAlignCenter';
import { faAlignJustify } from '@fortawesome/pro-regular-svg-icons/faAlignJustify';
import { faAlignLeft } from '@fortawesome/pro-regular-svg-icons/faAlignLeft';
import { faAlignRight } from '@fortawesome/pro-regular-svg-icons/faAlignRight';
import { faArrowToBottom } from '@fortawesome/pro-regular-svg-icons/faArrowToBottom';
import { faArrowToLeft } from '@fortawesome/pro-regular-svg-icons/faArrowToLeft';
import { faArrowToRight } from '@fortawesome/pro-regular-svg-icons/faArrowToRight';
import { faArrowToTop } from '@fortawesome/pro-regular-svg-icons/faArrowToTop';
import { faArrowUp } from '@fortawesome/pro-regular-svg-icons/faArrowUp';
import { faArrows } from '@fortawesome/pro-regular-svg-icons/faArrows';
import { faArrowsAlt } from '@fortawesome/pro-regular-svg-icons/faArrowsAlt';
import { faBorderInner } from '@fortawesome/pro-regular-svg-icons/faBorderInner';
import { faBorderStyle } from '@fortawesome/pro-regular-svg-icons/faBorderStyle';
import { faCaretDown } from '@fortawesome/pro-regular-svg-icons/faCaretDown';
import { faCaretRight } from '@fortawesome/pro-regular-svg-icons/faCaretRight';
import { faCaretUp } from '@fortawesome/pro-regular-svg-icons/faCaretUp';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons/faCheckSquare';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/pro-regular-svg-icons/faChevronUp';
import { faClone } from '@fortawesome/pro-regular-svg-icons/faClone';
import { faCode } from '@fortawesome/pro-regular-svg-icons/faCode';
import { faEdit } from '@fortawesome/pro-regular-svg-icons/faEdit';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';
import { faHorizontalRule } from '@fortawesome/pro-regular-svg-icons/faHorizontalRule';
import { faLineHeight } from '@fortawesome/pro-regular-svg-icons/faLineHeight';
import { faObjectGroup } from '@fortawesome/pro-regular-svg-icons/faObjectGroup';
import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil';
import { faImage } from '@fortawesome/pro-regular-svg-icons/faImage';
import { faPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faSlidersH } from '@fortawesome/pro-regular-svg-icons/faSlidersH';
import { faSquare } from '@fortawesome/pro-regular-svg-icons/faSquare';
import { faStrikethrough } from '@fortawesome/pro-regular-svg-icons/faStrikethrough';
import { faTextSize } from '@fortawesome/pro-regular-svg-icons/faTextSize';
import { faTextWidth } from '@fortawesome/pro-regular-svg-icons/faTextWidth';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faTimesCircle } from '@fortawesome/pro-regular-svg-icons/faTimesCircle';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';
import { faUnderline } from '@fortawesome/pro-regular-svg-icons/faUnderline';
import { faCaretDown as fasCaretDown } from '@fortawesome/pro-solid-svg-icons/faCaretDown';
import { faCaretUp as fasCaretUp } from '@fortawesome/pro-solid-svg-icons/faCaretUp';
import { faHorizontalRule as fasHorizontalRule } from '@fortawesome/pro-solid-svg-icons/faHorizontalRule';
import { faPaintBrush } from '@fortawesome/pro-solid-svg-icons/faPaintBrush';
import { faThLarge } from '@fortawesome/pro-solid-svg-icons/faThLarge';

export const loadIcons = () => {
  library.add(
    fasCaretDown,
    fasCaretUp,
    fasHorizontalRule,
    faPaintBrush,
    faThLarge,
    falFaHorizontalRule,
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faArrowToBottom,
    faArrowToLeft,
    faArrowToRight,
    faArrowToTop,
    faArrowUp,
    faArrows,
    faArrowsAlt,
    faBorderInner,
    faBorderStyle,
    faCaretDown,
    faCaretRight,
    faCaretUp,
    faCheck,
    faCheckSquare,
    faChevronDown,
    faChevronUp,
    faClone,
    faCode,
    faEdit,
    faEye,
    faEyeSlash,
    faHorizontalRule,
    faLineHeight,
    faObjectGroup,
    faPencil,
    faImage,
    faPlus,
    faSlidersH,
    faSquare,
    faStrikethrough,
    faTextSize,
    faTextWidth,
    faTimes,
    faTimesCircle,
    faTrash,
    faUnderline
  );
  dom.watch();
};
