function sendFile(files) {
  namespaceSocket.emit(
    "upload",
    { file: files[0], fileName: files[0].name },
    (status) => {
      console.log(status);
    }
  );
}
