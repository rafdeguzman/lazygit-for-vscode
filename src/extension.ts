import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "lazygit.openLazygit",
    openLazygit
  );

  context.subscriptions.push(disposable);
}

async function openLazygit() {
  if (!(await focusActiveLazygitInstance())) {
    await newLazygitInstance();
  }
}

/**
 * Tries to find an instance and focus on the tab.
 * @returns If an instance was found and focused
 */
async function focusActiveLazygitInstance(): Promise<boolean> {
  for (let openTerminal of vscode.window.terminals) {
    if (openTerminal.name === "LazyGit") {
      openTerminal.show();
      return true;
    }
  }
  return false;
}

async function newLazygitInstance() {
  // Always create a new terminal
  let terminal = vscode.window.createTerminal({
    name: "LazyGit",
    location: vscode.TerminalLocation.Panel,
  });

  terminal.show();
  terminal.sendText("lazygit && exit");
  terminal.show();
  // Move the terminal to the editor area
  // await vscode.commands.executeCommand(
  //   "workbench.action.terminal.moveToEditor"
  // );

  await vscode.commands.executeCommand(
    "workbench.action.terminal.chat.focusInput"
  );
  // Move focus back to the editor view
  // await vscode.commands.executeCommand(
  //   "workbench.action.focusActiveEditorGroup"
  // );
  // console.log("after workbench focus active");

  // if (vscode.window.terminals.length > 1) {
  //   // Close the terminal if it's not the only one
  //   await vscode.commands.executeCommand("workbench.action.togglePanel");
  // }
}

export function deactivate() {}
