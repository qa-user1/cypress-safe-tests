const C = require('../../fixtures/constants');
const S = require('../../fixtures/settings');
const D = require('../../fixtures/data');
const api = require('../../api-utils/api-spec');
const ui = require('../../pages/ui-spec');
const helper = require("../../support/e2e-helper");

let orgAdmin = S.userAccounts.orgAdmin;
let powerUser = S.userAccounts.powerUser;
let powerUser2 = S.userAccounts.basicUser;
let admin_userGroup = S.selectedEnvironment.admin_userGroup;

for (let i = 0; i < 1; i++) {

    describe('Add Task', function () {

        it.only('1.1.1 ' +
            'Add task with required fields only ' +
            '-- verify values on grid', function () {

            api.auth.get_tokens(orgAdmin);
            api.permissions.assign_user_to_User_Group(powerUser, admin_userGroup)
            api.users.update_current_user_settings(orgAdmin.id, C.currentDateTimeFormat, C.currentDateFormat)
            api.org_settings.enable_all_Item_fields();
            api.org_settings.enable_all_Person_fields()
            api.auto_disposition.edit(true)

            ui.app.log_title(this);

            let selectedTemplate = S.selectedEnvironment.taskTemplates.other

            D.getNewTaskData(null, null, orgAdmin, selectedTemplate.dueDays);
            D.newTask = Object.assign(D.newTask, selectedTemplate)

            ui.menu.click_Tasks()
            ui.addTask.click_button(C.buttons.addTask)
                .populate_all_fields(D.newTask, true, true, selectedTemplate)
                .click_Save_()
                .verify_toast_message(C.toastMsgs.saved)

                ui.taskList.search_for_the_task(orgAdmin.firstName)
                    .sort_by_descending_order('Creation Date')
                    .verify_task_data_on_grid(D.newTask)


        });
    });
}