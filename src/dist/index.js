'use strict';

var _BhButton = require('./components/BhButton');

var _BhButton2 = _interopRequireDefault(_BhButton);

var _BhCard = require('./components/BhCard');

var _BhCard2 = _interopRequireDefault(_BhCard);

var _BhCheckbox = require('./components/BhCheckbox');

var _BhCheckbox2 = _interopRequireDefault(_BhCheckbox);

var _BhChecklist = require('./components/BhChecklist');

var _BhChecklist2 = _interopRequireDefault(_BhChecklist);

var _BhChoose = require('./components/BhChoose');

var _BhChoose2 = _interopRequireDefault(_BhChoose);

var _BhDatatable = require('./components/BhDatatable');

var _BhDatatable2 = _interopRequireDefault(_BhDatatable);

var _BhDatetime = require('./components/BhDatetime');

var _BhDatetime2 = _interopRequireDefault(_BhDatetime);

var _BhDropdown = require('./components/BhDropdown');

var _BhDropdown2 = _interopRequireDefault(_BhDropdown);

var _BhDropdownmenu = require('./components/BhDropdownmenu');

var _BhDropdownmenu2 = _interopRequireDefault(_BhDropdownmenu);

var _BhEditPanel = require('./components/BhEditPanel');

var _BhEditPanel2 = _interopRequireDefault(_BhEditPanel);

var _BhFileupload = require('./components/BhFileupload');

var _BhFileupload2 = _interopRequireDefault(_BhFileupload);

var _BhFlowNode = require('./components/BhFlowNode');

var _BhFlowNode2 = _interopRequireDefault(_BhFlowNode);

var _BhFooter = require('./components/BhFooter');

var _BhFooter2 = _interopRequireDefault(_BhFooter);

var _BhHeader = require('./components/BhHeader');

var _BhHeader2 = _interopRequireDefault(_BhHeader);

var _BhInput = require('./components/BhInput');

var _BhInput2 = _interopRequireDefault(_BhInput);

var _BhListview = require('./components/BhListview');

var _BhListview2 = _interopRequireDefault(_BhListview);

var _BhLoading = require('./components/BhLoading');

var _BhLoading2 = _interopRequireDefault(_BhLoading);

var _BhNav = require('./components/BhNav');

var _BhNav2 = _interopRequireDefault(_BhNav);

var _BhOutline = require('./components/BhOutline');

var _BhOutline2 = _interopRequireDefault(_BhOutline);

var _BhPagination = require('./components/BhPagination');

var _BhPagination2 = _interopRequireDefault(_BhPagination);

var _BhPanel = require('./components/BhPanel');

var _BhPanel2 = _interopRequireDefault(_BhPanel);

var _BhRadio = require('./components/BhRadio');

var _BhRadio2 = _interopRequireDefault(_BhRadio);

var _BhSearch = require('./components/BhSearch');

var _BhSearch2 = _interopRequireDefault(_BhSearch);

var _BhSidemenus = require('./components/BhSidemenus');

var _BhSidemenus2 = _interopRequireDefault(_BhSidemenus);

var _BhStepFlow = require('./components/BhStepFlow');

var _BhStepFlow2 = _interopRequireDefault(_BhStepFlow);

var _BhStepWizard = require('./components/BhStepWizard');

var _BhStepWizard2 = _interopRequireDefault(_BhStepWizard);

var _BhSwitch = require('./components/BhSwitch');

var _BhSwitch2 = _interopRequireDefault(_BhSwitch);

var _BhTabs = require('./components/BhTabs');

var _BhTabs2 = _interopRequireDefault(_BhTabs);

var _BhTextarea = require('./components/BhTextarea');

var _BhTextarea2 = _interopRequireDefault(_BhTextarea);

var _BhTimepicker = require('./components/BhTimepicker');

var _BhTimepicker2 = _interopRequireDefault(_BhTimepicker);

var _BhToggle = require('./components/BhToggle');

var _BhToggle2 = _interopRequireDefault(_BhToggle);

var _BhTooltip = require('./components/BhTooltip');

var _BhTooltip2 = _interopRequireDefault(_BhTooltip);

var _BhTree = require('./components/BhTree');

var _BhTree2 = _interopRequireDefault(_BhTree);

var _BhWindow = require('./components/BhWindow');

var _BhWindow2 = _interopRequireDefault(_BhWindow);

var _BhWizard = require('./components/BhWizard');

var _BhWizard2 = _interopRequireDefault(_BhWizard);

var _ButtonList = require('./components/ButtonList');

var _ButtonList2 = _interopRequireDefault(_ButtonList);

var _Calendar = require('./components/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _CompChoose = require('./components/CompChoose');

var _CompChoose2 = _interopRequireDefault(_CompChoose);

var _CompTab = require('./components/CompTab');

var _CompTab2 = _interopRequireDefault(_CompTab);

var _DirectUpload = require('./components/DirectUpload');

var _DirectUpload2 = _interopRequireDefault(_DirectUpload);

var _EmapAvatarupload = require('./components/EmapAvatarupload');

var _EmapAvatarupload2 = _interopRequireDefault(_EmapAvatarupload);

var _EmapCard = require('./components/EmapCard');

var _EmapCard2 = _interopRequireDefault(_EmapCard);

var _EmapDatatable = require('./components/EmapDatatable');

var _EmapDatatable2 = _interopRequireDefault(_EmapDatatable);

var _EmapDdTable = require('./components/EmapDdTable');

var _EmapDdTable2 = _interopRequireDefault(_EmapDdTable);

var _EmapDdTree = require('./components/EmapDdTree');

var _EmapDdTree2 = _interopRequireDefault(_EmapDdTree);

var _EmapEditor = require('./components/EmapEditor');

var _EmapEditor2 = _interopRequireDefault(_EmapEditor);

var _EmapFileupload = require('./components/EmapFileupload');

var _EmapFileupload2 = _interopRequireDefault(_EmapFileupload);

var _EmapForm = require('./components/EmapForm');

var _EmapForm2 = _interopRequireDefault(_EmapForm);

var _EmapGrid = require('./components/EmapGrid');

var _EmapGrid2 = _interopRequireDefault(_EmapGrid);

var _EmapImageupload = require('./components/EmapImageupload');

var _EmapImageupload2 = _interopRequireDefault(_EmapImageupload);

var _EmapLinkage = require('./components/EmapLinkage');

var _EmapLinkage2 = _interopRequireDefault(_EmapLinkage);

var _EmapSearch = require('./components/EmapSearch');

var _EmapSearch2 = _interopRequireDefault(_EmapSearch);

var _EmapSearchAdv = require('./components/EmapSearchAdv');

var _EmapSearchAdv2 = _interopRequireDefault(_EmapSearchAdv);

var _EmapUpload = require('./components/EmapUpload');

var _EmapUpload2 = _interopRequireDefault(_EmapUpload);

var _SimpleSearch = require('./components/SimpleSearch');

var _SimpleSearch2 = _interopRequireDefault(_SimpleSearch);

var _Ztree = require('./components/Ztree');

var _Ztree2 = _interopRequireDefault(_Ztree);

var _pageUtil = require('./components/pageUtil');

var _pageUtil2 = _interopRequireDefault(_pageUtil);

var _http = require('./components/http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  BhButton: _BhButton2.default,
  BhCard: _BhCard2.default,
  BhCheckbox: _BhCheckbox2.default,
  BhChecklist: _BhChecklist2.default,
  BhChoose: _BhChoose2.default,
  BhDatatable: _BhDatatable2.default,
  BhDatetime: _BhDatetime2.default,
  BhDropdown: _BhDropdown2.default,
  BhDropdownmenu: _BhDropdownmenu2.default,
  BhEditPanel: _BhEditPanel2.default,
  BhFileupload: _BhFileupload2.default,
  BhFlowNode: _BhFlowNode2.default,
  BhFooter: _BhFooter2.default,
  BhHeader: _BhHeader2.default,
  BhInput: _BhInput2.default,
  BhListview: _BhListview2.default,
  BhLoading: _BhLoading2.default,
  BhNav: _BhNav2.default,
  BhOutline: _BhOutline2.default,
  BhPagination: _BhPagination2.default,
  BhPanel: _BhPanel2.default,
  BhRadio: _BhRadio2.default,
  BhSearch: _BhSearch2.default,
  BhSidemenus: _BhSidemenus2.default,
  BhStepFlow: _BhStepFlow2.default,
  BhStepWizard: _BhStepWizard2.default,
  BhSwitch: _BhSwitch2.default,
  BhTabs: _BhTabs2.default,
  BhTextarea: _BhTextarea2.default,
  BhTimepicker: _BhTimepicker2.default,
  BhToggle: _BhToggle2.default,
  BhTooltip: _BhTooltip2.default,
  BhTree: _BhTree2.default,
  BhWindow: _BhWindow2.default,
  BhWizard: _BhWizard2.default,
  ButtonList: _ButtonList2.default,
  Calendar: _Calendar2.default,
  CompChoose: _CompChoose2.default,
  CompTab: _CompTab2.default,
  DirectUpload: _DirectUpload2.default,
  EmapAvatarupload: _EmapAvatarupload2.default,
  EmapCard: _EmapCard2.default,
  EmapDatatable: _EmapDatatable2.default,
  EmapDdTable: _EmapDdTable2.default,
  EmapDdTree: _EmapDdTree2.default,
  EmapEditor: _EmapEditor2.default,
  EmapFileupload: _EmapFileupload2.default,
  EmapForm: _EmapForm2.default,
  EmapGrid: _EmapGrid2.default,
  EmapImageupload: _EmapImageupload2.default,
  EmapLinkage: _EmapLinkage2.default,
  EmapSearch: _EmapSearch2.default,
  EmapSearchAdv: _EmapSearchAdv2.default,
  EmapUpload: _EmapUpload2.default,
  SimpleSearch: _SimpleSearch2.default,
  Ztree: _Ztree2.default,
  pageUtil: _pageUtil2.default,
  http: _http2.default
};