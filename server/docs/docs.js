const swaggerDocs = {
    openapi: "3.0.0",


    info: {
        title: "MyNoticeAPI",
        description: "Это OpenAPI для моей проектной работы [MyNotice](http://yandex.ru).",
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        version: "1.0.0"
    },


    externalDocs: {
        description: "Find out more about Swagger",
        url: "http://swagger.io"
    },


    servers: [
        // {
        //     description: "Production dev",
        //     url: "https://petstore.swagger.io/api"
        // },
        // {
        //     url: "https://virtserver.swaggerhub.com/KLIKVUS/MyNoticeAPI/1.0.0",
        //     description: "SwaggerHub API Auto Mocking"
        // },
        {
            url: "http://localhost:8080/api",
            description: "Local dev"
        }
    ],


    tags: [
        {
            name: "notifications",
            name: "auth"
        }
    ],


    paths: {
        "/auth/signin": {
            post: {
                tags: [
                    "auth"
                ],
                summary: "Авторизация",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Auth__DATA"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "successful registrations",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__200_FOR_AUTH"
                                }
                            }
                        }
                    },
                    400: {
                        description: "bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__400"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/auth/signup": {
            post: {
                tags: [
                    "auth"
                ],
                summary: "Регистрации",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Auth__DATA"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "successful registrations",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__200_FOR_AUTH"
                                }
                            }
                        }
                    },
                    400: {
                        description: "bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__400"
                                }
                            }
                        }
                    }
                }
            }
        },


        "/notifications": {
            get: {
                tags: [
                    "notifications"
                ],
                summary: "Получить все уведомления",
                responses: {
                    200: {
                        description: "successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            example: 200
                                        },
                                        msg: {
                                            type: "string",
                                            example: "successful operation"
                                        },
                                        result: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Notification__ALL_DATA"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__401"
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: [
                    "notifications"
                ],
                summary: "Создать уведомление",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Notification__REQUIRED_DATA"
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    201: {
                        description: "notification created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__201"
                                }
                            }
                        }
                    },
                    400: {
                        description: "bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__400"
                                }
                            }
                        }
                    },
                    401: {
                        description: "unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__401"
                                }
                            }
                        }
                    }
                }
            },

            put: {
                tags: [
                    "notifications"
                ],
                summary: "Изменить уведомление",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Notification__ALL_DATA"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "notification updated",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__200"
                                }
                            }
                        }
                    },
                    201: {
                        description: "notification updated",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__201"
                                }
                            }
                        }
                    },
                    400: {
                        description: "bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__400"
                                }
                            }
                        }
                    },
                    401: {
                        description: "unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__401"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/notifications/{id}": {
            delete: {
                tags: [
                    "notifications"
                ],
                summary: "Удалить уведомление",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "notification ID",
                        required: true,
                        type: "integer",
                        format: "int64"
                    }
                ],
                responses: {
                    200: {
                        description: "notification delete",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__200"
                                }
                            }
                        }
                    },
                    400: {
                        description: "bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__400"
                                }
                            }
                        }
                    },
                    401: {
                        description: "unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/STATUS__401"
                                }
                            }
                        }
                    }
                }
            }
        },
    },


    components: {
        schemas: {
            Notification__ALL_DATA: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        format: "int64"
                    },
                    type: {
                        type: "string",
                        default: "",
                        enum: [
                            "",
                            "SUCCESS",
                            "WARNING",
                            "FAIL"
                        ]
                    },
                    title: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    lastSentAt: {
                        type: "integer",
                        example: 1655398389
                    }
                }
            },

            Notification__REQUIRED_DATA: {
                type: "object",
                required: [
                    "lastSentAt",
                    "title"
                ],
                properties: {
                    type: {
                        type: "string",
                        default: "",
                        enum: [
                            "",
                            "SUCCESS",
                            "WARNING",
                            "FAIL"
                        ]
                    },
                    title: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    lastSentAt: {
                        type: "integer",
                        example: 1655398389
                    }
                }
            },

            Auth__DATA: {
                type: "object",
                required: [
                    "login",
                    "password"
                ],
                properties: {
                    login: {
                        type: "string",
                        example: "user"
                    },
                    password: {
                        type: "string",
                        example: "123"
                    }
                }
            },

            STATUS__200_FOR_AUTH: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        example: 200
                    },
                    msg: {
                        type: "string",
                        example: "successful operation"
                    },
                    result: {
                        type: "object",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"
                    }
                }
            },

            STATUS__200: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        example: 200
                    },
                    msg: {
                        type: "string",
                        example: "successful operation"
                    }
                }
            },

            STATUS__201: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        example: 201
                    },
                    msg: {
                        type: "string",
                        example: "notification created"
                    }
                }
            },

            STATUS__400: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        example: 400
                    },
                    msg: {
                        type: "string",
                        example: "bad request"
                    }
                }
            },

            STATUS__401: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        example: 401
                    },
                    msg: {
                        type: "string",
                        example: "unauthorized"
                    }
                }
            }
        },

        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },

    security: {
        bearerAuth: []
    }
}

module.exports = swaggerDocs;