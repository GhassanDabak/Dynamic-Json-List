 type DynamicJsonListPropTypes = {
    data: Record<string, unknown>
    onClick: (path: string) => void
    isRtl?: boolean
    path?: string
    disabled?: boolean
    selectedPath?: string | null
    filterProperties?: string[]
  }

  export type { DynamicJsonListPropTypes };