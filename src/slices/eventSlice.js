import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { differenceInMinutes, format, subDays } from "date-fns";

const apiUrl = "https://babytracker.develotion.com";

// Acción para agregar un nuevo evento
export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventData, { getState }) => {
    const state = getState();
    const { apiKey, id } = state.user.userInfo;

    // Obtener la fecha actual
    const currentDate = new Date();

    // Obtener la fecha del evento
    const eventDate = new Date(eventData.fecha);

    // Verificar si la fecha es posterior a la fecha actual
    if (eventDate > currentDate) {
      throw new Error(
        "La fecha del evento no puede ser posterior a la fecha actual"
      );
    }

    // Formatear la fecha antes de enviar los datos
    const eventDataWithFormattedDate = {
      ...eventData,
      fecha: format(new Date(eventData.fecha), "yyyy-MM-dd HH:mm:ss"),
      idUsuario: id,
    };

    const response = await axios.post(
      `${apiUrl}/eventos.php`,
      eventDataWithFormattedDate,
      {
        headers: {
          apikey: apiKey,
          iduser: id,
        },
      }
    );
    return response.data;
  }
);

// Acción para listar eventos
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { getState }) => {
    const state = getState();
    const { apiKey, id } = state.user.userInfo;
    const response = await axios.get(`${apiUrl}/eventos.php?idUsuario=${id}`, {
      headers: {
        apikey: apiKey,
        iduser: id,
      },
    });
    return response.data;
  }
);

// Acción para eliminar un evento
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { getState }) => {
    const state = getState();
    const { apiKey, id } = state.user.userInfo; // Obtener apiKey del estado del usuario
    await axios.delete(`${apiUrl}/eventos.php?idEvento=${eventId}`, {
      headers: {
        apikey: apiKey,
        iduser: id,
      },
    });

    return eventId;
  }
);

// Acción para agrupar eventos por categoría
export const groupEventsByCategory = createAsyncThunk(
  "events/groupByCategory",
  async (_, { getState }) => {
    const { events } = getState().event;

    const categoryCounts = events.reduce((acc, event) => {
      const categoria = event.idCategoria;
      if (!acc[categoria]) {
        acc[categoria] = 0;
      }
      acc[categoria] += 1;
      return acc;
    }, {});

    return categoryCounts;
  }
);

// Acción para filtrar eventos por fecha
export const filterEventsByDate = createAsyncThunk(
  "events/filterByDate",
  async (_, { getState }) => {
    const { events } = getState().event;
    const todayDateString = format(new Date(), "yyyy-MM-dd"); // Fecha de hoy en formato YYYY-MM-DD

    // Filtrar eventos que coincidan con la fecha dada
    const filteredEvents = events.filter((event) => {
      const eventDate = event.fecha;
      const eventDateString = format(eventDate, "yyyy-MM-dd"); // Fecha del evento en formato YYYY-MM-DD

      return eventDateString === todayDateString;
    });

    return filteredEvents;
  }
);

// Acción para filtrar eventos de antes de hoy
export const filterEventsByBeforeDate = createAsyncThunk(
  "events/filterEventsByBeforeDate",
  async (_, { getState }) => {
    const { events } = getState().event;
    const todayDateString = format(new Date(), "yyyy-MM-dd"); // Fecha de hoy en formato YYYY-MM-DD

    // Filtrar eventos que coincidan con la fecha dada
    const filteredEvents = events.filter((event) => {
      const eventDate = event.fecha;
      const eventDateString = format(eventDate, "yyyy-MM-dd HH:mm:ss"); // Fecha del evento en formato YYYY-MM-DD HH:mm:ss
      return eventDateString < todayDateString;
    });

    return filteredEvents;
  }
);

// Acción para filtrar eventos por biberones
export const filterEventsForBiberones = createAsyncThunk(
  "events/filterEventsForBiberones",
  async (_, { getState }) => {
    const { events } = getState().event;

    const filteredEvents = events.filter((event) => event.idCategoria === 35);

    return filteredEvents;
  }
);

// Acción para filtrar eventos por pañales
export const filterEventsForDiapers = createAsyncThunk(
  "events/filterEventsForDiapers",
  async (_, { getState }) => {
    const { events } = getState().event;

    const filteredEvents = events.filter((event) => event.idCategoria === 33);

    return filteredEvents;
  }
);

// Acción para obtener el último evento de una categoría específica
export const getLastEventByCategory = createAsyncThunk(
  "events/getLastEventByCategory",
  async (categoryId, { getState }) => {
    const { events } = getState().event;
    const filteredEvents = events
      .filter((event) => event.idCategoria === categoryId)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if (filteredEvents.length === 0) {
      return null;
    }

    const lastEvent = filteredEvents[0];
    const timeElapsed = differenceInMinutes(
      new Date(),
      new Date(lastEvent.fecha)
    );

    return { lastEvent, timeElapsed };
  }
);

// Acción para obtener el conteo de comidas por día en los últimos 7 días
export const getMealsCountByDay = createAsyncThunk(
  "events/getMealsCountByDay",
  async (_, { getState }) => {
    const { events } = getState().event;
		const lastWeek = subDays(new Date(), 7); // Fecha de hace 7 días
    const meals = events.filter((event) => event.idCategoria === 31 && new Date(event.fecha) >= lastWeek);
    const initObj = {};

    for (let i = 0; i < 7; i++) {
      const currentDate = subDays(new Date(), i);
      const curDate = format(currentDate, "yyyy-MM-dd");
      initObj[curDate] = 0;
    }

    const mealsByDay = meals.reduce((acc, meal) => {
      const eventDate = format(new Date(meal.fecha), "yyyy-MM-dd");
      if (acc[eventDate] !== undefined) {
        acc[eventDate] += 1;
      }
      return acc;
    }, initObj);

    return mealsByDay;
  }
);

// Estado inicial de eventos
const initialState = {
  events: [],
  loading: false,
  error: null,
  categoryCounts: {},
  eventsForDay: [],
  eventsForBeforeToday: [],
  eventsForBiberones: [],
  eventsForDiapers: [],
	mealsCountForDay: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Agregar un evento
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Listar eventos
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.eventos;
        //console.log("Eventos cargados:", state.events);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Eliminar un evento
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        //console.log("Eliminando evento...");
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
        //console.log("Evento eliminado:", action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        //console.log("Error al eliminar evento:", action.error.message);
      })
      // Agrupar eventos por categoría
      .addCase(groupEventsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(groupEventsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryCounts = action.payload;
        //console.log("Conteo por categorías:", state.categoryCounts);
      })
      .addCase(groupEventsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agrupar eventos por dia
      .addCase(filterEventsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEventsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsForDay = action.payload;
      })
      .addCase(filterEventsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agrupar eventos de antes de hoy
      .addCase(filterEventsByBeforeDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEventsByBeforeDate.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsForBeforeToday = action.payload;
      })
      .addCase(filterEventsByBeforeDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Filtrar eventos por biberones
      .addCase(filterEventsForBiberones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEventsForBiberones.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsForBiberones = action.payload;
      })
      .addCase(filterEventsForBiberones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Filtrar eventos por pañales
      .addCase(filterEventsForDiapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterEventsForDiapers.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsForDiapers = action.payload;
      })
      .addCase(filterEventsForDiapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Filtrar eventos de comida de los ultimos 7 dias
      .addCase(getMealsCountByDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getMealsCountByDay.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsCountForDay = action.payload;
      })
      .addCase(getMealsCountByDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
