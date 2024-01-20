// THIS FILE IS A WORK IN PROGRESS
// ONLY TESTING FOR THE MOMENT

import { Component, Inject, ViewChild } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { basicSetup, minimalSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

@Component({
  selector: "app-code-view",
  templateUrl: "./code-view.component.html",
  styleUrls: ["./code-view.component.css"],
})
export class CodeViewComponent {
  @ViewChild("myeditor") myEditor: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [basicSetup, javascript(), oneDark];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc: 'console.log("hello");\n// type if.',
        extensions: myExt,
      });
    } catch (e) {
      //Please make sure install codemirror@6.0.1
      //If your command was npm install codemirror, will installed 6.65.1(whatever)
      //You will be here.
      console.error(e);
    }

    //console.log(state);

    let view = new EditorView({
      state,
      parent: myEditorElement,
    });
  }
}
