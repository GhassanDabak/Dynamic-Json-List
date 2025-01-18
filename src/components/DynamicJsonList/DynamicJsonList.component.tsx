import { ExpandLess } from "@mui/icons-material"
import CheckIcon from "@mui/icons-material/Check"
import DataArrayIcon from "@mui/icons-material/DataArray"
import DataObjectIcon from "@mui/icons-material/DataObject"
import ExpandMore from "@mui/icons-material/ExpandMore"
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { DynamicJsonListPropTypes } from "./DynamicJsonList.types"
import { isArray, isObject, isPrimitive, showFirst30Characters } from "_utils/string.util"

const DynamicJsonList = ({
  data,
  path = "",
  isRtl = false,
  onClick,
  disabled = false,
  selectedPath,
  filterProperties: filteredProperties = [],
}: DynamicJsonListPropTypes) => {
  const isFirstLevel = path === ""

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  )
  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string,
  ) => {
    event.stopPropagation()
    setExpandedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string,
  ) => {
    event.stopPropagation()
    const fullPath = path ? `${path}.${key}` : key
    onClick?.(fullPath)
  }

  const renderValue = (key: string, value: unknown): JSX.Element => {
    if (isPrimitive(value)) {
      return <span> : {value}</span>
    }
    if (isObject(value)) {
      return (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            bgcolor="#EDEDF0"
            padding="0.2em 0.4em"
            borderRadius="8px"
            alignItems="center"
            style={{ cursor: "pointer" }}
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#D3D3D3",
              },
            }}
            onClick={(e) => {
              toggleExpand(e, key)
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <TopicOutlinedIcon fontSize="small" color="disabled" />
              <Typography variant="subtitle2">{key}</Typography>
              {isArray(value) ? (
                <DataArrayIcon fontSize="small" />
              ) : (
                <DataObjectIcon fontSize="small" />
              )}
            </Box>
            {expandedItems[key] ? (
              <ExpandLess fontSize="small" color="disabled" />
            ) : (
              <ExpandMore fontSize="small" color="disabled" />
            )}
          </Box>
          {expandedItems[key] && (
            <>
              <Box marginLeft="1em" marginTop="0.2em"  borderLeft="1.5px solid #ccc">
                <DynamicJsonList
                  data={value}
                  path={path ? `${path}.${key}` : key}
                  onClick={onClick}
                  disabled={disabled}
                  filterProperties={filteredProperties}
                  selectedPath={selectedPath}
                />
              </Box>
            </>
          )}
        </>
      )
    }
    return <span>Unsupported Value</span>
  }

  return (
    <ul
      style={{
        listStyleType: "none",
        padding: isFirstLevel ? "0 0.2em" : 0,
      }}
    >
      {Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key, value]) => {
          if (filteredProperties.includes(key)) {
            return null
          }
          const fullPath = path ? `${path}.${key}` : key // Full path for the current key

          return (
            <li
              key={key}
              style={{
                padding: isFirstLevel ? "0.2em" : "0.3em 0", // padding between list items
                marginLeft: !isRtl && !isFirstLevel ? "1em" : 0,
                marginRight: isRtl && !isFirstLevel ? "1em" : 0,
              }}
            >
              {isObject(value) || isArray(value) ? (
                renderValue(key, value)
              ) : (
                <Box
                  bgcolor="#EDEDF0"
                  padding="0.2em 0.4em"
                  borderRadius="8px"
                  display="flex"
                  justifyContent="space-between"
                  style={{ cursor: "pointer" }}
                  sx={{
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#D3D3D3",
                    },
                  }}
                  onClick={(event) => {
                    handleClick(event, key)
                    event.stopPropagation()
                  }}
                >
                  <Box display="flex" alignItems="center" gap="0.5em">
                    <Typography
                      color={selectedPath === fullPath ? "#45B974" : "inherit"}
                      variant="subtitle2"
                    >
                      {key}
                    </Typography>
                    <Typography variant="caption">
                      {showFirst30Characters(String(value))}
                    </Typography>
                  </Box>

                  {selectedPath === fullPath ? (
                    <CheckIcon
                      color="success"
                      fontSize="small"
                      sx={{ alignSelf: "flex-end" }}
                    />
                  ) : null}
                </Box>
              )}
            </li>
          )
        })}
    </ul>
  )
}

export default DynamicJsonList