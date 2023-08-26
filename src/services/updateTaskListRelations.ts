type UpdateTaskRelationProps = {
  taskID: string;
  taskListID: string;
};

const UpdateTaskListRelations = async ({
  taskID,
  taskListID,
}: UpdateTaskRelationProps) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task-lists/${taskListID}?populate=*/`,
    {
      method: "put",
      body: JSON.stringify({
        data: {
          tasks: {
            connect: [
              {
                id: taskID,
              },
            ],
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  );
};

export default UpdateTaskListRelations;
