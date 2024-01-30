import { ViewType } from "../utils/component-interface";
import { User } from "../utils/user-interface";
import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
  selector: "app-user-generator",
  templateUrl: "./user-generator.component.html",
  styleUrls: ["./user-generator.component.css"],
})
export class UserGeneratorComponent {
  generatedRandomUsersString: string = "";
  userList: User[] = [];
  onUserListUpdated(newList: User[]) {
    this.userList = newList;

    // Filter not needed properties in the printed String
    const tempUserList = newList.map(
      ({ picturePath, builtPicturePath, ageGroup, ...rest }) => rest
    );

    this.generatedRandomUsersString = JSON.stringify(
      tempUserList,
      undefined,
      4
    );
  }

  chosenViewType: ViewType = ViewType.JSON;
  onChosenViewTypeUpdated(newViewType: ViewType) {
    this.chosenViewType = newViewType;
  }

  ViewTypes = ViewType;

  translate: TranslateService = TranslateService.prototype;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  onTextareaClick(event: MouseEvent): void {
    // Your code to be executed when the textarea is clicked
    this.copyToClipboard();
  }

  /**
   * Copies contents of the generated random users into a stringified json format
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedRandomUsersString);
    const copiedMessageElement = document.getElementById("copiedMessage");
    if (!copiedMessageElement) {
      return;
    }
    copiedMessageElement.style.visibility = "visible";
    setTimeout(() => {
      copiedMessageElement.style.visibility = "hidden";
    }, 1000);
  }
}
