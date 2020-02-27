Var SystemDrive

!macro preInit
    ReadEnvStr $SystemDrive SYSTEMDRIVE
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\앱이설치될폴더명"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\앱이설치될폴더명"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\앱이설치될폴더명"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\앱이설치될폴더명"
!macroend
